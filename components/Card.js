import { View, Text, TouchableOpacity, Image } from 'react-native'

import React from 'react'
import { ChatBubbleBottomCenterIcon, HeartIcon } from 'react-native-heroicons/outline'
import { HeartIcon as HeartIcon2 } from 'react-native-heroicons/solid'
import { formatDistance } from 'date-fns'


export default function Card({ item }) {
    const [like, setLike] = React.useState(0);

    return (
        <View className=' p-4
        bg-white shadow-md rounded-2xl m-4
        '>
            <View className='flex-row gap-2 '>
                <Image className='rounded-full' source={require('../assets/images/Avatar.jpg')} style={{ width: 40, height: 40 }} />
                <Text className='text-lg font-semibold'>{item.name}</Text>

            </View>
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
                    <TouchableOpacity

                    >
                        {like === 0 ? <HeartIcon size={30} color='#3B82F6' onPress={() => setLike(1)} /> : <HeartIcon2 size={30} color='#3B82F6' onPress={() => setLike(0)} />
                        }

                        {/* // like count */}

                    </TouchableOpacity>
                    <Text className='text-gray-500 font-semibold p-1'>
                        {item.likes + like}
                    </Text>
                </View>

                <View className='flex-row gap-1'>
                    <TouchableOpacity>
                        <ChatBubbleBottomCenterIcon size={30} color='#3B82F6' />
                        {/* // comment count */}
                    </TouchableOpacity>
                    <Text className='text-gray-500 p-1 font-semibold'> 10</Text>
                </View>
            </View>
            {/* // time of confession */}

        </View>
    )
}