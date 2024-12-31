import React from 'react';
import { FlatList, View,Text, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
export default function DetailScreen (){
  return (
    <View style={styles.container}> 
        <View style={styles.MENU}>
            <Link href="/(tabs)/Khht2425HK1" style={styles. NUT}>
                <Text style={{fontSize: 20}}>NĂM HỌC 2024-2025 HK 1</Text>
            </Link>
            <Link href="/(tabs)/Khht2425HK2" style={styles. NUT}>
                <Text style={{fontSize: 20}}>NĂM HỌC 2024-2025 HK 2</Text>
            </Link>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  NUT: {
    backgroundColor: 'skyblue',
    padding: 15,
    borderColor: '#2F4F4F',
    borderWidth: 2,
    borderRadius: 5,
    elevation: 10,
    textAlign: 'center',
  },
  MENU: {
    marginHorizontal: 25,
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
    borderWidth: 1,
  },
  container: {
    flex:1,
    backgroundColor: '#E8EAED',
    flexDirection: 'column',
    },
});

