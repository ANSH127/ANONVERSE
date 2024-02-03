import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatDistance } from 'date-fns'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'

export default function CommentCard({ item}) {
    return (
        <View>

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
    )
}