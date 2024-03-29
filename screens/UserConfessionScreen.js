import { View, Text, Image, FlatList, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { confessionRef, auth } from '../config/firebase';
import { getDocs, query, orderBy, where } from 'firebase/firestore'
import Card from '../components/Card';
import { useSelector } from 'react-redux';

export default function UserConfessionScreen() {
  const avatarlist = useSelector(state => state.user.AvtarList)
  const [confessions, setConfessions] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const fetchConfession = async () => {
    try {
      setLoading(true)
      let data = []



      const q = query(confessionRef, where('uid', '==', auth.currentUser.uid), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })

      });

      setConfessions(data)

    } catch (error) {
      Alert.alert(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfession()

  }, [])
  return (
    <View className='py-4'>

      {
        loading ?
          <View className='flex-1 p-4 justify-center items-center'>
            <Image source={require('../assets/images/loading.gif')} style={{ width: 150, height: 150 }} />

          </View> :
          confessions.length === 0 ? <View className='p-4 justify-center items-center'>
            <Text className='text-center text-2xl font-bold'>No Confessions</Text>
          </View> :
            <View className='h-full '>

              <FlatList
                data={confessions}

                renderItem={({ item }) => (

                  <>
                    <Card item={item}
                    avatarIndex={avatarlist.find(avatar => avatar.uid === item.uid).avatar}

                     />
                  </>

                )}
                keyExtractor={item => item.id}



                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 200 }}
              />
            </View>}
    </View>
  )
}