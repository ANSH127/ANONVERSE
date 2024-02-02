import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import { PlusCircleIcon } from 'react-native-heroicons/solid'

export default function HomeScreen({navigation}) {
  
  return (
    <ScreenWrapper className='flex-1'>

      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-2xl shadow-sm`} >AnonVerse</Text>
        <View className='flex-row gap-1'>

          <TouchableOpacity>
            <PlusCircleIcon size={50} color='#3B82F6' />
          </TouchableOpacity>



          <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
            <Image className='rounded-full' source={require('../assets/images/Avatar.jpg')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>

      </View>
      <Text className='text-3xl text-black'>Home Screen</Text>

    </ScreenWrapper>


  )
}