
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddConfessionScreen from '../screens/AddConfessionScreen';
import CommentScreen from '../screens/CommentScreen';
import UserConfessionScreen from '../screens/UserConfessionScreen';
import { onAuthStateChanged} from 'firebase/auth';
import { auth } from '../config/firebase';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  const [user,setUser] = React.useState(null)


  onAuthStateChanged(auth, (user) => {
    if (user?.emailVerified) {
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
          <Stack.Screen name="Profile" component={ProfileScreen} options={{
            headerShown:true,
          }} />
          <Stack.Screen name="AddConfession" component={AddConfessionScreen}
          options={{
            headerShown:true,
            presentation:'modal',
          }}

           />
          <Stack.Screen name="Comments" component={CommentScreen}
          options={{
            headerShown:true,
            presentation:'modal',
          }}


           />

          <Stack.Screen name="MyConfession" component={UserConfessionScreen} options={{headerShown:true,presentation:'modal'}} />
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