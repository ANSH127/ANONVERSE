import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function ScreenWrapper({children}) {

    let statusBarHeight = StatusBar.currentHeight?StatusBar.currentHeight:30;
  return (
    <View style={{paddingTop:statusBarHeight}} >
        {children}

        <StatusBar style="auto" />
    </View>
  )
}