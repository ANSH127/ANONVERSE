import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import Card from '../components/Card';
import { confessionRef } from '../config/firebase';
import { getDocs } from 'firebase/firestore'


export default function HomeScreen({ navigation }) {
  const [confessions, setConfessions] = React.useState([])
  const fetchConfession = async () => {
    let data = []
    const querySnapshot = await getDocs(confessionRef);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id })

    });
    setConfessions(data)
  }
  useEffect(() => {
    fetchConfession()
  }, [])

  return (
    <ScreenWrapper className='flex-1'>

      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-2xl shadow-sm`} >AnonVerse</Text>
        <View className='flex-row gap-1'>

          <TouchableOpacity>
            <PlusCircleIcon size={50} color='#3B82F6' />
          </TouchableOpacity>



          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image className='rounded-full' source={require('../assets/images/Avatar.jpg')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>

      </View>
      {/* // make it scrollable */}
      <View 
      className='h-full '
      >

        <FlatList
          data={confessions}

          renderItem={({ item }) => (
            <>
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            <Card name={item.name} confession={item.description} mylike={item.likes} comment={item.comment} />
            </>

          )}
          keyExtractor={item => item.id}

          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      </View>


    </ScreenWrapper>


  )
}