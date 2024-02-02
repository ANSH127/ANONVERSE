import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
// import { auth } from '../config/firebase'

export default function ProfileScreen() {

    const handleLogout = () => {
        // auth.signOut()
    }
    return (
        <ScreenWrapper className='flex-1'>
            <View className='items-center'>
                <Image className='rounded-full' source={require('../assets/images/Avatar.jpg')} style={{ width: 200, height: 200 }} />
                {/* // welcome user */}
                <Text className='text-3xl text-black font-semibold pt-2'>Ansh</Text>
                {/* // show user email */}
                <View className='w-full justify-center p-4'>
                    <Text className='text-xl text-black font-semibold '>Email:</Text>


                    <TextInput className='p-4 mb-3 bg-blue-100 text-gray-700 rounded-2xl w-full' defaultValue='anshagrawal48568@gmail.com' editable={false} selectTextOnFocus={false} />
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