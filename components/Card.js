import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'

import React, { useEffect } from 'react'
import { ChatBubbleBottomCenterIcon, HeartIcon, FlagIcon } from 'react-native-heroicons/outline'
import { HeartIcon as HeartIcon2, FlagIcon as FlagIcon2 } from 'react-native-heroicons/solid'
import { formatDistance } from 'date-fns'
import { confessionRef, auth } from '../config/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function Card({ item }) {
    const [like, setLike] = React.useState(0);
    const [loading, setLoading] = React.useState(false)

    const navigation = useNavigation()
    const handleLike = async (val) => {

        try {
            setLoading(true);
            if (val === 1 && !item.likedby.includes(auth.currentUser.uid)) {
                const user = auth.currentUser;
                await updateDoc(doc(confessionRef, item.id), {
                    likes: item.likes + 1,
                    likedby: [...item.likedby, user.uid]

                })
                item.likedby.push(user.uid)
                item.likes = item.likes + 1
                setLike(1)
                // Alert.alert("Liked")
            }
            else if (val === 0 && item.likedby.includes(auth.currentUser.uid)) {
                setLike(1);
                const user = auth.currentUser;
                await updateDoc(doc(confessionRef, item.id), {
                    likes: Math.max(item.likes - 1, 0),
                    likedby: item.likedby.filter((id) => id !== user.uid)

                })

                item.likedby = item.likedby.filter((id) => id !== auth.currentUser.uid)
                item.likes = Math.max(item.likes - 1, 0)
                setLike(0)
                // Alert.alert("Unliked")
            }

        } catch (error) {
            Alert.alert(error.message)

        }
        finally {
            setLoading(false)
        }

    }


    const handleReport = () => {
        try {
            if (item.reportedBy.includes(auth.currentUser.uid)) {
                Alert.alert('Already Reported', 'You have already reported this post. Our team will review the post and take necessary action if required.')
                return;
            }

            updateDoc(doc(confessionRef, item.id), {
                reportedBy: [...item.reportedBy, auth.currentUser.uid]
            })
            item.reportedBy.push(auth.currentUser.uid)


            Alert.alert('Reported', 'Thank you for reporting the post. Our team will review the post and take necessary action if required.');

        } catch (error) {

            Alert.alert(error.message)

        }



        Alert.alert('Reported', 'Thank you for reporting the post. Our team will review the post and take necessary action if required.')


    }

    return (
        <View className=' p-4
        bg-white shadow-md rounded-2xl m-4
        '>
            <View className='flex-row justify-between'>
                <View className='flex-row  gap-2'>

                    <Image className='rounded-full' source={require('../assets/images/Avatar.jpg')} style={{ width: 40, height: 40 }} />
                    <Text className='text-lg font-semibold'>{item.name}</Text>
                </View>

                {/* // report button */}
                <View className='flex-row pt-1 '>
                    <TouchableOpacity onPress={handleReport} >
                        {
                            item.reportedBy.includes(auth.currentUser.uid) ?
                                <FlagIcon2 size={25} color='#e61014' />
                                :
                                <FlagIcon size={25} color='#e61014' />
                        }
                    </TouchableOpacity>
                </View>


            </View>


            {item.reportedBy.length >=5  &&
                <View className='p-1'>
                    <Text className='text-red-500 font-semibold'>
                        Your Confession Reported and Under Review by Admin (Not visible to others)
                    </Text>
                </View>

            }

            <View className='p-2 rounded-2xl bg-gray-100 mt-2'>
                <Text className='text-gray-500'>
                    {/* //confession */}

                    {item.description}
                </Text>
                <Text className='text-gray-500 text-right mt-2'>
                    {/* //time of confession */}
                    {formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true })}
                </Text>

            </View>
            {/* // like and comment button */}
            <View className='flex-row justify-around mt-2'>
                <View className='flex-row gap-1'>
                    {
                        loading ?
                            <Image source={require('../assets/images/loading2.gif')} style={{ width: 30, height: 30 }} />
                            :
                            <TouchableOpacity>
                                {
                                    item.likedby.includes(auth.currentUser.uid) || like ?
                                        <HeartIcon2 size={30} color='#3B82F6' onPress={() => handleLike(0)} />
                                        :
                                        <HeartIcon size={30} color='#3B82F6' onPress={() => handleLike(1)} />
                                }
                            </TouchableOpacity>}
                    <Text className='text-gray-500 font-semibold p-1'>
                        {Math.max(item.likes, 0)}
                    </Text>
                </View>

                <View className='flex-row gap-1'>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Comments', { item })
                    } >
                        <ChatBubbleBottomCenterIcon size={30} color='#3B82F6' />
                        {/* // comment count */}

                    </TouchableOpacity>
                    <Text className='text-gray-500 p-1 font-semibold'>
                        {item.comments.length}
                    </Text>
                </View>
            </View>
            {/* // time of confession */}

        </View>
    )
}