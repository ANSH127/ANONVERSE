import { View, Text, Image, TouchableOpacity } from 'react-native'

import { usersRef, auth } from '../config/firebase'
import { updateDoc, getDocs, doc, where, query } from 'firebase/firestore'
import React from 'react'
import Loadar from '../components/Loadar'

import { setAvtar } from '../redux/slices/user';
import { useDispatch } from 'react-redux'


const Avatar = [
    require('../assets/images/Avatar/Avatar1.jpg'),
    require('../assets/images/Avatar/Avatar2.jpg'),
    require('../assets/images/Avatar/Avatar3.jpg'),
    require('../assets/images/Avatar/Avatar4.jpg'),
    require('../assets/images/Avatar/Avatar5.jpg'),
    require('../assets/images/Avatar/Avatar6.jpg'),

]

export default function AvatarScreen({ navigation}) {
    const dispatch = useDispatch()
    const [selected, setSelected] = React.useState(null)
    const [loading, setLoading] = React.useState(false)


    const fetchUser = async () => {
        try {
            let data = []
            const q = query(usersRef, where('uid', '==', auth.currentUser.uid))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })


            });
            return data;


        } catch (error) {
            console.log(error);
        }

    }

    const handleAvatar = async () => {
        try {
            setLoading(true)
            const data = await fetchUser();

            await updateDoc(doc(usersRef, data[0].id), {
                avatar: selected
            })
            dispatch(setAvtar(selected))

            navigation.navigate('Profile')




            
        } catch (error) {
            console.log(error)
        }
        
        finally
        {
            setLoading(false)
        }


    }
    return (
        <View>
            {/* // display avatar and allow user to change it */}

            <View className=' flex flex-row flex-wrap justify-around p-1 gap-4'>
                {Avatar.map((avatar, index) => {
                    return (
                        <TouchableOpacity key={index}
                            onPress={() => setSelected(index)}

                            // change the border color of the selected avatar
                            className={`${selected === index ? ' bg-blue-200' : ''}`}


                        >
                            <Image source={avatar} style={{ width: 180, height: 180, borderRadius: 100 }} />
                        </TouchableOpacity>
                    )
                })}
            </View>

            <View className='flex-row justify-center mt-3'>
                {
                    loading? <Loadar />:
                    <TouchableOpacity className='bg-blue-400  w-4/5 p-3 rounded-2xl' onPress={handleAvatar}>
                    <Text className='text-center text-xl text-gray-700 font-bold'>
                        Save
                    </Text>
                </TouchableOpacity>}
            </View>






        </View>
    )
}