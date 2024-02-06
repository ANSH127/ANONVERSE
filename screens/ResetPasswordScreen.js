import { View, Text, Image, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { TextInput } from 'react-native'
import Loadar from '../components/Loadar'
import { auth } from '../config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

export default function ResetPasswordScreen({navigation}) {

    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleResetPassword = async () => {
        if (email === '') {
            Alert.alert('Please fill all the fields')
            return
        }
        else {
            setLoading(true)
            try {
                await sendPasswordResetEmail(auth, email)
                Alert.alert('Password reset link has been sent to your email')
                navigation.navigate('Login')

            } catch (error) {
                Alert.alert(error.message)
            }
            finally {
                setLoading(false)
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

            <View className='' style={{ backgroundColor: themeColors.bg }}>
                <SafeAreaView className='flex' >
                    <View className='flex-row justify-start'>
                        <TouchableOpacity className='bg-blue-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4' onPress={() => navigation.goBack()} >
                            <ArrowLeftIcon size={20} color='black' />


                        </TouchableOpacity>
                    </View>
                    <View className='flex-row justify-center mb-5'>
                        <Image source={require('../assets/images/forgot.png')} style={{
                            width: "100%", height: 250
                            , resizeMode: 'contain'
                        }} />
                    </View>

                </SafeAreaView>
                <View className=' h-full bg-white px-8 p-8' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                    <View className='form space-y-2'>
                        <Text className='text-gray-700 ml-4'>Email Address</Text>
                        <TextInput className='p-4 bg-gray-100 mb-3 text-gray-700 rounded-2xl ' placeholder='Enter Email ' onChangeText={
                            (text) => setEmail(text)
                        } />

                        {
                            loading ? <Loadar /> :
                                <TouchableOpacity className='bg-blue-500 p-3 rounded-2xl' onPress={handleResetPassword}  >
                                    <Text className='text-center text-xl text-gray-700 font-bold'>
                                        Reset Password
                                    </Text>
                                </TouchableOpacity>}
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}