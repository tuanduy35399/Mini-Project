import React, {useState} from 'react';
import { FlatList, View, Text, StyleSheet} from 'react-native';


export default function DetailScreen (){
  const [data1, setData1] =useState([
    {id:'1',ma: 'C09090', name: 'Nguyên Lý Máy Học', TC: 3},
    {id:'2',ma: 'C09090', name: 'Nguyên Lý Máy Học', TC: 3}
  ])
  return (
    <View style={styles.container}> 
    <View style={styles.hocphan}>
  <FlatList
  data= {data1}
  keyExtractor={(item) => item.id}
    renderItem= {({item}) => 
      
          <View style={styles.item}>
            <Text style={styles.maHocPhan}>Mã: {item.ma}</Text>
            <Text style={styles.tenHocPhan}>Tên: {item.name}</Text>
            <Text style={styles.soTinChi}>Số tính chỉ: {item.TC}</Text>
          </View>
    
     }
/>
</View>
    </View>
  )
}


const styles = StyleSheet.create({
  hocphan: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal:10,
  },
  container: {
    flex:1,
    backgroundColor: '#E8EAED',
    flexDirection: 'column',
    justifyContent: 'center',
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    maHocPhan: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    tenHocPhan: {
      fontSize: 16,
    },
    soTinChi: {
      fontSize: 14,
      color: 'gray',
    },
});

