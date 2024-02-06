import { View, Text, TouchableOpacity, Image, FlatList, Alert, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import { PlusCircleIcon, ArchiveBoxIcon } from 'react-native-heroicons/solid';
import Card from '../components/Card';
import { confessionRef,usersRef, auth } from '../config/firebase';
import { getDocs, query, orderBy, where } from 'firebase/firestore'
import { useIsFocused } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import {setAvtarList,setAvtar } from '../redux/slices/user';



const Avatar = [
  require('../assets/images/Avatar/Avatar1.jpg'),
  require('../assets/images/Avatar/Avatar2.jpg'),
  require('../assets/images/Avatar/Avatar3.jpg'),
  require('../assets/images/Avatar/Avatar4.jpg'),
  require('../assets/images/Avatar/Avatar5.jpg'),
  require('../assets/images/Avatar/Avatar6.jpg'),

]


export default function HomeScreen({ navigation }) {
  const avatarlist = useSelector(state => state.user.AvtarList)

  const dispatch = useDispatch()
  const avatar = useSelector(state => state.user.avtar)
  const isFocused = useIsFocused()
  const [confessions, setConfessions] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const fetchConfession = async () => {
    try {
      setLoading(true)
      let data = []

      const q = query(confessionRef, orderBy('uid'), where('uid', '!=', auth.currentUser.uid), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })

      });
      // console.log(data);
      setConfessions(data)


    } catch (error) {
      console.log(error.message);
      Alert.alert(error.message)
    }
    finally {
      setLoading(false)
    }
  }


  const fetchAllUsersAvatar = async () => {
    try {
      setLoading(true)
      let data = []

      let querySnapshot = await getDocs(usersRef);
      querySnapshot.forEach((doc) => {
        data.push({ avatar: doc.data().avatar, uid: doc.data().uid ,id:doc.id})

      });
      dispatch(setAvtarList(data))

      dispatch(setAvtar(data.find(avatar => avatar.uid === auth.currentUser.uid).avatar))

    } catch (error) {
      console.log(error.message);
      Alert.alert(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // if (isFocused) {
      fetchAllUsersAvatar()
    fetchConfession()
    // }
  }, [])

  return (
    <ScreenWrapper className='flex-1'>

      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-2xl shadow-sm`} >AnonVerse</Text>
        <View className='flex-row gap-1'>

          <TouchableOpacity className='pt-1' onPress={() => navigation.navigate('MyConfession')}>
            <ArchiveBoxIcon size={45} color='#3B82F6' />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AddConfession')}>
            <PlusCircleIcon size={50} color='#3B82F6' />
          </TouchableOpacity>



          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image className='rounded-full' source={
              avatar ? Avatar[avatar] : Avatar[0]
            } style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>

      </View>
      {/* // make it scrollable */}


      {
        loading ?
          <View className='flex-1 p-4 justify-center items-center'>
            <Image source={require('../assets/images/loading.gif')} style={{ width: 150, height: 150 }} />

          </View> :
          <View className='h-full '>

            {confessions.length === 0 && <View className='flex-1  items-center'>
              <Text className='text-lg font-bold text-center'>No Confessions Yet</Text>
            </View>}


            <FlatList
              data={confessions}

              renderItem={({ item }) => (

                <>
                  {item.reportedBy.length < 5 &&

                    <Card item={item} 
                    avatarIndex={avatarlist.find(avatar => avatar.uid === item.uid).avatar}
                     />
                  }
                </>

              )}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={fetchConfession}
                />
              }

              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 200 }}
            />
          </View>}


    </ScreenWrapper>


  )
}