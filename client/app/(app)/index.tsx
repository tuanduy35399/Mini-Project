import { Text, View } from 'react-native';

import { useSession } from '../../ctx';

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}


// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const HomeScreen = () => {
//   const [userToken, setUserToken] = useState<string|null>('');
//   useEffect(() => {
//     const getToken = async () => {
//       const token = await AsyncStorage.getItem('userToken');
//       setUserToken(token);
//     };
//     getToken();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('userToken');
//     navigation.navigate("Login");
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Chào mừng đến Home</Text>
//       <Button title="Đăng xuất" onPress={handleLogout} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

// export default HomeScreen;
