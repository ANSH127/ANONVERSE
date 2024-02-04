
import { Text, View, Linking } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />

        <View className='bottom-0 p-4'>
          <Text className='text-gray-500 text-center'>
            Developed by <Text className='text-blue-500'
              onPress={() => Linking.openURL('https://www.instagram.com/i_agarwal_ansh/')}
            >

              Ansh Agarwal


            </Text>
          </Text>

        </View>
      </Provider>
    </>

  );
}

