import { View, Text, Image ,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { TextInput } from 'react-native'
import Loadar from '../components/Loadar'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginScreen({ navigation }) {
  
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const handleSignIn=async()=>{
    if(email==='' || password===''){
      Alert.alert('Please fill all the fields')
      return
    }
    else{
      setLoading(true)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        if(user.emailVerified){

          navigation.navigate('Home')
        }
        else{
          Alert.alert('Please verify your email address')
        }
        
      } catch (error) {
        Alert.alert(error.message)
        
      }
      finally{
        setLoading(false)
      }
    }


  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

    <View className='flex-1' style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className='flex' >
        <View className='flex-row justify-start'>
          <TouchableOpacity className='bg-blue-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4' onPress={() => navigation.goBack()} >
            <ArrowLeftIcon size={20} color='black' />


          </TouchableOpacity>
        </View>
        <View className='flex-row justify-center mb-5'>
          <Image source={require('../assets/images/login.png')} style={{
            width: "100%", height: 200
            , resizeMode: 'contain'
          }} />
        </View>

      </SafeAreaView>
      <View className='flex-1 bg-white px-8 pt-8 ' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <View className='form space-y-2'>
          <Text className='text-gray-700 ml-4'>Email Address</Text>
          <TextInput className='p-4 bg-gray-100 mb-3 text-gray-700 rounded-2xl ' placeholder='Enter Email ' onChangeText={
            (text) => setEmail(text)
          } />
          <Text className='text-gray-700 ml-4'>Password</Text>
          <TextInput secureTextEntry className='p-4 bg-gray-100 text-gray-700 rounded-2xl ' placeholder='Enter Password ' onChangeText={(text)=>setPassword(text)} />
          <TouchableOpacity className='flex items-end my-2'>
            <Text className='text-right text-gray-700 mr-4'>Forgot Password?</Text>
          </TouchableOpacity>

          {
            loading?<Loadar/>:
            <TouchableOpacity className='bg-blue-500 p-3 rounded-2xl' onPress={handleSignIn} >
            <Text className='text-center text-xl text-gray-700 font-bold'>Login</Text>
          </TouchableOpacity>}
        </View>
        <View className='flex-row justify-center mt-2'>
          <Text className=' text-gray-500 font-bold '>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className='text-blue-500 font-bold'> Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}