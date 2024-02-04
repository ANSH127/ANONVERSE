import { View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert,Image } from 'react-native'
import React from 'react'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'
import CommentCard from '../components/CommentCard'
import { confessionRef, auth } from '../config/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import Loadar from '../components/Loadar'


export default function CommentScreen(props) {
    const [comments, setComments] = React.useState(props.route.params.item.comments)
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [isdeleting, setIsdeleting] = React.useState(false)


    const handleComment = async () => {
        if (message.length <= 3) {
            Alert.alert("Comment should be atleast 3 characters long")
            return;
        }
        try {
            setLoading(true)
            const user = auth.currentUser;
            const comment = {
                comment: message,
                createdAt: new Date().toISOString(),
                uid: user.uid
            }
            await updateDoc(doc(confessionRef, props.route.params.item.id), {
                comments: [...comments, comment]
            })
            setComments([...comments, comment])
            setMessage('')
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }


    const handleDelete = async (obj) => {
        try {
            setIsdeleting(true);
            const newComments = comments.filter((item) => item !== obj)
            await updateDoc(doc(confessionRef, props.route.params.item.id), {
                comments: newComments
            })
            setComments(newComments)
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsdeleting(false)
        }
    }


    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}
            keyboardVerticalOffset={100}
        >
            <View style={{ flex: 1 }}>
                {/* display comments here */}
                {
                    isdeleting ?
                        <View className='flex-1 p-4 justify-center items-center'>
                            <Image source={require('../assets/images/loading.gif')} style={{ width: 150, height: 150 }} />

                        </View> 
                        :
                        <View style={{ height: '90%' }}>
                            <FlatList
                                data={comments}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <>
                                        <CommentCard item={item} id={props.route.params.item.id} handleDelete={handleDelete} />
                                    </>
                                )}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 30 }}
                            />
                        </View>}

                {/* add a comment input here at the bottom */}
                <View className="absolute bottom-1 left-0 right-0">
                    <View className="flex-row justify-between items-center p-4">
                        <TextInput className="flex-1 border-2 border-gray-500 rounded-lg p-4" placeholder="Add a comment" multiline={true} numberOfLines={4} onChangeText={
                            (text) => setMessage(text)
                        } defaultValue={message} />


                        {
                            loading ? <Loadar /> :
                                <TouchableOpacity className="pt-2" onPress={handleComment} >
                                    <PaperAirplaneIcon size={35} color="#3B82F6" />
                                </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}