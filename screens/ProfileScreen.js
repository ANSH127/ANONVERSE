import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { auth, usersRef } from '../config/firebase'
import { getDocs, or, query, where, orderBy } from 'firebase/firestore'
import Loadar from '../components/Loadar'

import { useIsFocused } from '@react-navigation/native'
import { useSelector,useDispatch } from 'react-redux'
import { setAvtar,setAvtarList } from '../redux/slices/user'


const Avatar = [
    require('../assets/images/Avatar/Avatar1.jpg'),
    require('../assets/images/Avatar/Avatar2.jpg'),
    require('../assets/images/Avatar/Avatar3.jpg'),
    require('../assets/images/Avatar/Avatar4.jpg'),
    require('../assets/images/Avatar/Avatar5.jpg'),
    require('../assets/images/Avatar/Avatar6.jpg'),

]

export default function ProfileScreen({ navigation}) {
    const dispatch = useDispatch()
    const avatar = useSelector(state => state.user.avtar)
    const isFocused = useIsFocused()
    const [loading, setLoading] = React.useState(false)


    const handleLogout = () => {
        auth.signOut()
    }

    const [userData, setUserData] = React.useState({})

    // const fetchUserData = async () => {
    //     try {
    //         setLoading(true)
    //         const user = auth.currentUser

    //         if (user) {
    //             let data = []
    //             const q = query(usersRef, where('uid', '==', user.uid))
    //             const querySnapshot = await getDocs(q)
    //             querySnapshot.forEach((doc) => {
    //                 data.push({ ...doc.data(), id: doc.id })

    //             });
    //             setUserData(data[0])
    //             dispatch(setAvtar(data[0].avatar))
    //         }

    //     } catch (error) {
    //         Alert.alert(error.message)

    //     }
    //     finally {
    //         setLoading(false)
    //     }


    // }

    const fetchUserData = async () => {
        try {
            setLoading(true)
            let data = []
            let data2 = []

            let querySnapshot = await getDocs(usersRef);
            querySnapshot.forEach((doc) => {
                if (doc.data().uid === auth.currentUser.uid) {
                    data2.push({...doc.data(),id:doc.id})
                }
                data.push({ avatar: doc.data().avatar, uid: doc.data().uid ,id:doc.id})

            });
            dispatch(setAvtarList(data))
            dispatch(setAvtar(data2[0].avatar))
            setUserData(data2[0])
        } catch (error) {
            Alert.alert(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [isFocused])

    return (
        <ScreenWrapper className='flex-1'>
            <View className='items-center h-full'>
                <TouchableOpacity  onPress={() => navigation.navigate('Avatar')} >
                <Image className='rounded-full' source={
                    Avatar[userData.avatar]
                } style={{ width: 200, height: 200 }} />
                </TouchableOpacity>
                {/* // welcome user */}

                <Text className='text-3xl text-black font-semibold pt-2'>
                    {userData.name}
                </Text>
                {/* // show user email */}
                {loading ? <Loadar /> :
                    <>
                        <View className='w-full justify-center p-4'>
                            <Text className='text-xl text-black font-semibold '>Email:</Text>


                            <TextInput className='p-4 mb-3 bg-blue-100 text-gray-700 rounded-2xl w-full' defaultValue={userData.email} editable={false} selectTextOnFocus={false} />
                        </View>

                        <View className='w-full justify-center p-4'>
                            <TouchableOpacity className='bg-blue-200 p-3 rounded-2xl' onPress={handleLogout}  >
                                <Text className='text-center text-xl text-gray-700 font-bold'>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </>}



            </View>
        </ScreenWrapper>
    )
}