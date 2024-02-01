
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { onAuthStateChanged} from 'firebase/auth';
import { auth } from '../config/firebase';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  const [user,setUser] = React.useState(null)


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  });


  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown:false
        }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome"
        screenOptions={{
          headerShown:false
        }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }



  // return (

  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName={user ? "Home" : "Welcome"}
  //     screenOptions={{
  //       headerShown:false
  //     }}
  //     >
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //       <Stack.Screen name="Login" component={LoginScreen} />
  //       <Stack.Screen name="SignUp" component={SignUpScreen} />
  //       <Stack.Screen name="Welcome" component={WelcomeScreen} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // )
}