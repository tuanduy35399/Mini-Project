import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen() {
  const [data, setData] = useState([]);

  // Lấy dữ liệu từ AsyncStorage khi component được render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('selectedTasks');
        // Lấy dữ liệu từ AsyncStorage và phân tích nó
const parsedData = storedData ? JSON.parse(storedData) : null;

        if (storedData) {
          setData(JSON.parse(storedData)); // Chuyển dữ liệu từ chuỗi JSON sang object/array
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()} // Tạo key từ index nếu không có id
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Mã: {item.maHocPhan}</Text>
            <Text style={styles.text}>Tên: {item.tenHocPhan}</Text>
            <Text style={styles.text}>Số tín chỉ: {item.soTinChi}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
