import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Link } from 'expo-router';

// Bạn có thể sử dụng axios để gọi API (nếu cần)
import axios from 'axios';

const HocPhi = () => {
  const [danhSachHocPhan, setDanhSachHocPhan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Biến để theo dõi trạng thái tải

  useEffect(() => {
    // Lấy dữ liệu từ API
    axios.get('http://192.168.1.58:3000/api/lopHocPhan')
      .then((response) => {
        setDanhSachHocPhan(response.data);  // Lưu dữ liệu vào state
        setIsLoading(false);  // Đánh dấu là dữ liệu đã tải xong
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);  // Trong trường hợp có lỗi, đánh dấu đã xong tải
      });
  }, []);

  const renderItem = ({ item }) => {
    console.log(item.HOCPHAN)
    console.log(item.HOCPHI)
    const tinChi = item.HOCPHAN ? item.HOCPHAN.TINCHI : 0;
    const hocPhi = item.HOCPHI ? item.HOCPHI.MUCHOCPHI : 0;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {item.HOCPHAN ? item.HOCPHAN.TENHOCPHAN : 'Không có tên học phần'}:
        </Text>
        <Text style={{ ...styles.itemContainer, color: 'blue', backgroundColor: 'cyan' }}>
          {tinChi * hocPhi}.000 vnd
        </Text>
      </View>
    );
  };

  const tongHocPhi = danhSachHocPhan.reduce((tongHP, HP) => {
    const tinChi = HP.HOCPHAN?.TINCHI || 0;  // Kiểm tra sự tồn tại của HOCPHAN
    const hocPhi = HP.HOCPHI?.MUCHOCPHI || 0;  // Kiểm tra sự tồn tại của HOCPHI
    return tongHP + tinChi * hocPhi;
  }, 0);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Đang tải dữ liệu...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={{ ...styles.buttonText }}>Home</Text>
        </TouchableOpacity>
      </Link>
      <FlatList
        data={danhSachHocPhan}
        renderItem={renderItem}
        keyExtractor={item => item.maLopHP ? item.maLopHP : item._id}  // Sử dụng maLopHP hoặc _id nếu maLopHP không tồn tại
        contentContainerStyle={styles.flatListContent}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...styles.totalText, flex: 9, textAlign: 'right' }}>Tổng học phí:  </Text>
        <Text style={{ ...styles.totalText, flex: 1 }}>{tongHocPhi}.000vnd</Text>
      </View>
    </SafeAreaView>
  );
};

export default HocPhi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#4CAF50', // Green background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#388E3C',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff', // White text
    textTransform: 'uppercase',
  },
  totalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#FFEB3B', // Yellow background for total fee
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    textTransform: 'uppercase',
  },
  buttonText: {
    fontSize: 16, // Set a reasonable font size
    fontWeight: '600', // Bold font to make the text clear
    color: '#fff', // White text for contrast
    textAlign: 'center', // Ensure the text is centered within the button
  },
  button: {
    backgroundColor: 'blue', // Green color for buttons
    paddingVertical: 12, // Vertical padding to increase button size
    paddingHorizontal: 25, // Horizontal padding to give enough space for text
    marginHorizontal: 15, // Space between buttons
    borderColor: 'white', // Darker green border for contrast
    borderWidth: 2,
    borderRadius: 8, // Rounded corners for the buttons
    elevation: 5, // Slight shadow for the button
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center',
  },
});
