import { View, Text, Image } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { TextInput } from 'react-native'

export default function SignUpScreen({ navigation }) {
  
  return (
    <View className='flex-1' style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className='flex' >
        <View className='flex-row justify-start'>
          <TouchableOpacity className='bg-blue-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4' onPress={() => navigation.goBack()} >
            <ArrowLeftIcon size={20} color='black' />


          </TouchableOpacity>
        </View>
        <View className='flex-row justify-center mb-5'>
          <Image source={require('../assets/images/signup.png')} style={{ width: "100%", height: 200
          ,resizeMode:'contain'
         }} />
        </View>

      </SafeAreaView>
      <View className='flex-1 bg-white px-8 pt-8 ' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <View className='form space-y-2'>
          <Text className='text-gray-700 ml-4'>Full Name</Text>
          <TextInput className='p-4 bg-gray-100 mb-3 text-gray-700 rounded-2xl ' placeholder='Enter Name ' />
          <Text className='text-gray-700 ml-4'>Email Address</Text>
          <TextInput className='p-4 bg-gray-100 mb-3 text-gray-700 rounded-2xl ' placeholder='Enter Email ' />
          <Text className='text-gray-700 ml-4'>Password</Text>
          <TextInput secureTextEntry className='p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2 ' placeholder='Enter Password ' />

          <TouchableOpacity className='bg-blue-500 p-3 rounded-2xl' onPress={() => navigation.navigate('Preview')} >
            <Text className='text-center text-xl text-gray-700 font-bold'>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-center mt-2'>
          <Text className=' text-gray-500 font-bold '>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className='text-blue-500 font-bold'> Sign In</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}