import { View, TextInput, TouchableOpacity, FlatList,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'
import CommentCard from '../components/CommentCard'


export default function CommentScreen(props) {
    const [comments, setComments] = React.useState(props.route.params.item.comments)
    const [loading, setLoading] = React.useState(false)


    return (
        <KeyboardAvoidingView behavior="padding"  style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        >
        <View style={{ flex: 1 }}>
            {/* display comments here */}
            <View style={{height: '90%'}}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => (
                    <>
                        <CommentCard item={item} />
                        <CommentCard item={item} />
                        <CommentCard item={item} />
                        <CommentCard item={item} />
                        <CommentCard item={item} />
                        <CommentCard item={item} />
                    </>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
            </View>

            {/* add a comment input here at the bottom */}
            <View className="absolute bottom-1 left-0 right-0">
                <View className="flex-row justify-between items-center p-4">
                    <TextInput className="flex-1 border-2 border-gray-500 rounded-lg p-4" placeholder="Add a comment" multiline={true} numberOfLines={4} />
                    <TouchableOpacity className="pt-2">
                        <PaperAirplaneIcon size={35} color="#3B82F6" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}