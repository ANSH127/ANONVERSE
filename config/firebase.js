// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
import {API_KEY} from "@env"


// import {getAuth} from 'firebase/auth';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "anonverse-9a191.firebaseapp.com",
  projectId: "anonverse-9a191",
  storageBucket: "anonverse-9a191.appspot.com",
  messagingSenderId: "684576067991",
  appId: "1:684576067991:web:ee29d5b46b628f98c9f4d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);.
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const usersRef =collection(db, "users");
export const confessionRef =collection(db, "confession");

export default app;