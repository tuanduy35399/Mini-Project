import React from 'react';
import {Image, View, StyleSheet, ImageBackground} from 'react-native';

import { Link } from 'expo-router';

export default function HomeScreen() {
  
return (
  <View style={styles.container}>
    <View style={styles.part2} > 
    <ImageBackground source={require('../../assets/images/ATL.jpg')} style= {styles.background}>
      <View style={styles.hinh}>
        <Image source={require('../../assets/images/CTU.png')}  style={styles.logo}/>
      </View>
      <View style={styles.MENU}>
      <Link href="/(tabs)/KHHT" style={styles.NUT}>XEM KẾ HOẠCH HỌC TẬP</Link>
      <Link href="/(tabs)/editKHHT" style={styles.NUT}>SỬA KẾ HOẠCH HỌC TẬP</Link>
      </View>
    </ImageBackground>
    </View>
  </View>

)
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'skyblue',
    flexDirection: 'column',
    justifyContent: 'center',
    },
    MENU: {
      paddingHorizontal:90,
      // marginHorizontal: 5,
      marginVertical: 250,
    },
    hinh: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 300,
    },
  part2: {
    flex: 1,
  },
  NUT: {
    backgroundColor: 'skyblue',
    padding: 12,
    borderColor: '#2F4F4F',
    borderWidth: 2,
    borderRadius: 5,
    elevation: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  TextSize: {
    fontSize: 18,
    color: '#1F2833',
    fontWeight: 'bold',
   textAlign: 'center',

  },
  Tieude: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  logo: {
    width: '50%', // Chiếm 80% chiều rộng của màn hình
    height: undefined, // Không cố định chiều cao, nó sẽ tự điều chỉnh
    aspectRatio: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});


