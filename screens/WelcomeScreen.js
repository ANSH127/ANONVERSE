import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView className='flex-1' style={{ backgroundColor: themeColors.bg }}>
      <View className='flex-1 flex justify-around my-3'>
        <View>

          <Text className='text-black font-bold text-4xl text-center'>Let's Get Started</Text>
          <Text className=' text-blue-500 font-bold text-4xl my-4 text-center'>Anonverse</Text>
        </View>
      </View>
      <View className='flex-row justify-center'>
        <Image source={require('../assets/images/logo.png')} style={{ width: 300, height: 300 }} />
      </View>
      <View className='space-y-4'>
        <TouchableOpacity className='py-3 bg-blue-500 mx-7 rounded-xl' onPress={() => navigation.navigate('SignUp')}>
          <Text className='text-center text-gray-700 font-bold text-xl'>Sign Up</Text>
        </TouchableOpacity>
        <View className='flex-row justify-center mb-10'>
          <Text className=' text-black font-bold '>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className='text-blue-500 font-bold'> Sign In</Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  )
}