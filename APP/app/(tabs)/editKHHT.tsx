import React, { useState, useEffect} from 'react';
import { View, FlatList, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [availableTasks, setAvailableTasks] = useState([
    { id: '1', maHocPhan: 'CT101H', tenHocPhan: 'Toán cho khoa học máy tính', soTinChi: 4 },
    { id: '2', maHocPhan: 'CT104H', tenHocPhan: 'Nguyên lý hệ điều hành', soTinChi: 3 },
    { id: '3', maHocPhan: 'CT110H', tenHocPhan: 'Cơ Sở Dữ Liệu', soTinChi: 3 },
    { id: '4', maHocPhan: 'CT108H', tenHocPhan: 'Lập trình hướng đối tượng', soTinChi: 3 },
    { id: '5', maHocPhan: 'KL001E', tenHocPhan: 'Pháp luật đại cương', soTinChi: 2 },
    { id: '6', maHocPhan: 'ML016', tenHocPhan: 'Kinh tế chính trị Mác - Lênin', soTinChi: 2 },
  ]);

//   Danh sách các task đã chọn
  const [selectedTasks, setSelectedTasks] = useState([]);
  
  // Hàm tải task từ AsyncStorage khi ứng dụng mở lại
  useEffect(() => {
    const loadSelectedTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('selectedTasks');
        if (storedTasks) {
          setSelectedTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage", error);
      }
    };
    loadSelectedTasks();
  }, []);

  // Hàm lưu task vào AsyncStorage
  const saveTasksToStorage = async (tasks) => {
    console.log(tasks);
    try {
      await AsyncStorage.setItem('selectedTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage", error);
    }
  };

  // Hàm chọn một task
  const selectTask = (id) => {
    const taskToSelect = availableTasks.find((task) => task.id === id);

    // Kiểm tra nếu task đã được chọn
    if (selectedTasks.some((task) => task.id === id)) {
      Alert.alert('Thông báo', 'Học phần này đã được chọn!');
      return;
    }

    // Thêm task vào danh sách đã chọn
    if (taskToSelect) {
      const newSelectedTasks = [...selectedTasks, taskToSelect];
      setSelectedTasks(newSelectedTasks);
      saveTasksToStorage(newSelectedTasks); // Lưu task vào AsyncStorage
    }
  };

  // Hàm xóa một task khỏi danh sách đã chọn
  const deleteTask = (id) => {
    const updatedTasks = selectedTasks.filter((task) => task.id !== id);
    setSelectedTasks(updatedTasks);
    saveTasksToStorage(updatedTasks); // Lưu task vào AsyncStorage
    Alert.alert('Thông báo', 'Học phần đã được xóa!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách học phần trong hệ thống</Text>
      <FlatList
        data={availableTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
                      <Text style={styles.maHocPhan}>Mã: {item.maHocPhan}</Text>
                      <Text style={styles.tenHocPhan}>Tên: {item.tenHocPhan}</Text>
                      <Text style={styles.soTinChi}>Số tính chỉ: {item.soTinChi}</Text>  
            <Button title="Chọn" onPress={() => selectTask(item.id)} />
          </View>
        )}
      />

      <Text style={styles.title}>Danh sách học phần đã chọn</Text>
      <FlatList
        data={selectedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
                      <Text style={styles.maHocPhan}>Mã: {item.maHocPhan}</Text>
                      <Text style={styles.tenHocPhan}>Tên: {item.tenHocPhan}</Text>
                      <Text style={styles.soTinChi}>Số tính chỉ: {item.soTinChi}</Text>  
            <Button title="Xóa" onPress={() => deleteTask(item.id)} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có công việc nào được chọn!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    color: 'gray',
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
export default App;
