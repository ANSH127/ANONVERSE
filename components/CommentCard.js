import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatDistance } from 'date-fns'
import { TrashIcon } from 'react-native-heroicons/solid'
import { auth } from '../config/firebase'
import GestureRecognizer from 'react-native-swipe-gestures';



export default function CommentCard({ item, id,handleDelete }) {
    const [handleSwipe, setHandleSwipe] = React.useState(false)


    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer


            onSwipeLeft={() => setHandleSwipe(true)}
            onSwipeRight={() => setHandleSwipe(false)}



            config={config}


        >
            <View
                // on swipe move the card to left and right
                style={{
                    transform: [
                        { translateX: handleSwipe && item.uid == auth.currentUser.uid ? -100 : 0 }
                    ]
                }}
            >

                <View className='shadow-md rounded-2xl m-3'>

                    <View className='p-2 rounded-2xl bg-gray-100 '>
                        <View className='flex-row gap-2 '>
                            <Image className='rounded-full' source={require('../assets/images/Avatar.jpg')} style={{ width: 40, height: 40 }} />
                            <Text className='text-lg font-semibold'>
                                Anonymous
                            </Text>

                        </View>

                        <Text className='text-gray-500 pt-2 mr-2'>
                            {/* //confession */}

                            {item.comment}
                        </Text>
                        <Text className='text-gray-500 text-right mt-2'>
                            {formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true })}

                        </Text>
                    </View>
                </View>
            </View>
            {
                handleSwipe && item.uid === auth.currentUser.uid &&
                <View className='absolute  right-2 p-4'
                    style={{
                        top: '30%'
                    }}
                >
                    {

                        <TouchableOpacity onPress={() => handleDelete(item)} >
                            <TrashIcon size={30} color='#e61014' />
                        </TouchableOpacity>
                    }
                </View>
            }
        </GestureRecognizer>
    )
}