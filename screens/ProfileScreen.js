import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { auth,usersRef } from '../config/firebase'
import { getDocs, or, query, where,orderBy } from 'firebase/firestore'


export default function ProfileScreen() {

    const handleLogout = () => {
        auth.signOut()
    }

    const [userData, setUserData] = React.useState({})

    const fetchUserData = async () => {
        const user = auth.currentUser
        if (user) {
            let data = []
            const q = query(usersRef, where('uid', '==', user.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                    data.push({...doc.data(),id:doc.id})

            });
            setUserData(data[0])
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <ScreenWrapper className='flex-1'>
            <View className='items-center'>
                <Image className='rounded-full' source={require('../assets/images/Avatar.jpg')} style={{ width: 200, height: 200 }} />
                {/* // welcome user */}
                <Text className='text-3xl text-black font-semibold pt-2'>
                    Welcome {userData.name}
                </Text>
                {/* // show user email */}
                <View className='w-full justify-center p-4'>
                    <Text className='text-xl text-black font-semibold '>Email:</Text>


                    <TextInput className='p-4 mb-3 bg-blue-100 text-gray-700 rounded-2xl w-full' defaultValue={userData.email}   editable={false} selectTextOnFocus={false} />
                </View>
                {/* logout button */}

                <View className='w-full justify-center p-4'>
                    <TouchableOpacity className='bg-blue-200 p-3 rounded-2xl' onPress={handleLogout}  >
                        <Text className='text-center text-xl text-gray-700 font-bold'>Logout</Text>
                    </TouchableOpacity>
                </View>







            </View>
        </ScreenWrapper>
    )
}