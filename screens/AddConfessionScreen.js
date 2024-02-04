import { View, Text, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, Alert,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'

import { auth, usersRef, confessionRef } from '../config/firebase'
import { getDocs, query, where, addDoc } from 'firebase/firestore'
import Loadar from '../components/Loadar'

const name = ["Anonyums", "Profile Name"];

export default function AddConfessionScreen({ navigation }) {
    const [loading, setLoading] = React.useState(false)

    const [Displayname, setDisplayName] = React.useState('')


    const [confession, setConfession] = React.useState('')

    const fetchUserData = async (user) => {
        let data = []
        const q = query(usersRef, where('uid', '==', user.uid))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })


        })
        return data[0].name;
    }

    const handleSubmit = async () => {
        setLoading(true)
        const user = auth.currentUser
        let n = Displayname;
        try {

            if (user) {
                if (Displayname == "Profile Name") {
                    n = await fetchUserData(user);
                }
                let doc = await addDoc(confessionRef, {
                    name: n,
                    description: confession,
                    uid: user.uid,
                    createdAt: new Date().toISOString(),
                    likes: 0,
                    comments: [],

                    likedby: [],
                    reportedBy: []


                })

                if (doc) {
                    Alert.alert("Confession Added Successfully");
                    navigation.goBack();

                }
            }

        } catch (error) {
            Alert.alert(error.message)


        }
        finally {
            setLoading(false)
        }
    }
    return (
        <KeyboardAvoidingView behavior='position'
            keyboardVerticalOffset={100}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View className='bg-white h-full p-4'>
                    <View className='flex-1 justify-center mb-2'>
                        <Image source={require('../assets/images/confession.jpg')} style={{
                            width: "100%", height: 200
                            , resizeMode: 'contain'
                        }} />
                    </View>
                    <View className='p-4 '>
                        {/* // select user */}
                        <View
                            className=' mb-5'>
                            <SelectDropdown data={name} buttonStyle={{ backgroundColor: '#dbeafe', width: 'auto' }} buttonTextStyle={{ color: '#000000' }} defaultButtonText='Select Name to display'
                                onSelect={(selectedItem, index) => {
                                    setDisplayName(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}


                            />
                        </View>


                        <TextInput className='px-4  mb-3 bg-blue-100 text-gray-700 rounded-2xl w-full' placeholder='Confession'
                            scrollEnabled={true}
                            multiline={true}
                            numberOfLines={7}
                            onChangeText={
                                (text) => setConfession(text)
                            }
                        />
                        {/* // submit button */}

                        {
                            loading ? <Loadar /> :
                                <TouchableOpacity className='bg-blue-200 p-3 rounded-2xl'
                                    onPress={() => {
                                        handleSubmit()
                                    }}
                                >
                                    <Text className='text-center text-xl text-gray-700 font-bold'>Submit</Text>
                                </TouchableOpacity>}
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}