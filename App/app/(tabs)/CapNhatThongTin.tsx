import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TextInput, Alert, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import Picker

interface Student {
  _id: string;
  MSSV: string;
  TENSV: string;
  NGAYSINH: Date;
  DIACHI: string;
  EMAIL: string;
  GIOITINH: boolean; // Sử dụng kiểu boolean cho giới tính (Nam: true, Nữ: false)
  MATKHAU: string;
  QUYENTK: string;
}

export default function CapNhatThongTin() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);
  const [message, setMessage] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');
  const genderOptions = ['Nam', 'Nữ']; // Mặc định là Nam trước, Nữ sau, tùy thuộc vào GIOITINH

  const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    axios.get<Student[]>('http://192.168.1.58:3000/api/quanLyTaiKhoanSV/capNhatThongTin')
      .then((response) => {
        const studentData = response.data;
        console.log('Dữ liệu sinh viên:', studentData);

        // Lọc sinh viên có quyền hoạt động (QUYENTK !== 'unactive')
        const activeStudents = studentData.filter(student => student.QUYENTK.trim() !== 'unactive');

        if (activeStudents.length > 0) {
          setStudents(activeStudents);
        } else {
          setStudents([]);
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu sinh viên", error);
      });
  }, []);

  useEffect(() => {
    if (editedStudent && editedStudent.NGAYSINH) {
      setDateInput(formatDate(editedStudent.NGAYSINH)); // Chuyển ngày sinh thành định dạng DD/MM/YYYY
    }
  }, [editedStudent]);

  const handleInputChange = (field: keyof Student, value: string) => {
    if (editedStudent) {
      setEditedStudent({
        ...editedStudent,
        [field]: value, // Cập nhật giá trị trường tương ứng
      });
    }
  };

  const handleDateChange = (date: string) => {
    setDateInput(date);
    const [day, month, year] = date.split('/');
    if (day && month && year) {
      const formattedDate = new Date(Number(year), Number(month) - 1, Number(day));
      if (!isNaN(formattedDate.getTime())) {
        if (editedStudent) {
          setEditedStudent({ ...editedStudent, NGAYSINH: formattedDate });
        }
      } else {
        setMessage('Ngày sinh không hợp lệ!');
      }
    } else {
      setMessage('Định dạng ngày không đúng! (DD/MM/YYYY)');
    }
  };

  const handleGenderChange = (value: string) => {
    const gender = value === 'Nam' ? true : false; // Nam = true, Nữ = false
    if (editedStudent) {
      setEditedStudent({ ...editedStudent, GIOITINH: gender }); // Cập nhật giá trị GIOITINH
    }
  };

  const handleSubmit = () => {
    if (!editedStudent || !editedStudent._id) {
      setMessage('Vui lòng chọn một sinh viên để cập nhật.');
      return;
    }

    // Kiểm tra thông tin đầu vào (ví dụ: MSSV, TENSV, NGAYSINH, ... đều có giá trị)
    if (!editedStudent.MSSV || !editedStudent.TENSV || !editedStudent.NGAYSINH) {
      setMessage('Vui lòng điền đầy đủ thông tin sinh viên.');
      return;
    }

    axios.put(`http://192.168.1.58:3000/api/quanLyTaiKhoanSV/capNhatThongTin/${editedStudent._id}`, editedStudent)
      .then(response => {
        const updatedStudents = students.map(student =>
          student._id === editedStudent._id ? { ...student, ...editedStudent } : student
        );
        setStudents(updatedStudents);
        setMessage('Thông tin đã được cập nhật!');
        setEditedStudent(null); // Sau khi cập nhật, trả về giao diện chỉ có nút chỉnh sửa
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật thông tin sinh viên:', error);
        setMessage('Lỗi khi cập nhật thông tin!');
      });
  };

  const handleEditClick = (student: Student) => {
    setEditedStudent(student); // Cập nhật sinh viên cần chỉnh sửa
    setDateInput(formatDate(student.NGAYSINH)); // Cập nhật ngày sinh khi chọn sinh viên
  };

  const handleDeleteStudent = () => {
    if (!editedStudent || !editedStudent._id) {
      if (Platform.OS === 'web') {
        window.alert("Không có sinh viên để xóa.");  // Sử dụng window.alert cho web
      } else {
        Alert.alert("Lỗi", "Không có sinh viên để xóa.");  // Sử dụng Alert cho di động
      }
      return;
    }

    // Tiến hành xóa sinh viên
    if (Platform.OS === 'web') {
      // Sử dụng window.confirm cho web
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?");
      if (confirmed) {
        // Nếu người dùng chọn "OK", tiến hành xóa sinh viên
        axios.put(`http://192.168.1.58:3000/api/quanLyTaiKhoanSV/capNhatThongTin/${editedStudent._id}`, {
          ...editedStudent, QUYENTK: 'unactive'
        })
        .then(response => {
          const updatedStudents = students.filter(student => student._id !== editedStudent._id);
          setStudents(updatedStudents);

          // Cập nhật lại editedStudent sau khi xóa
          if (updatedStudents.length > 0) {
            setEditedStudent(updatedStudents[0]); // Chuyển sang sinh viên đầu tiên
          } else {
            setEditedStudent(null); // Nếu không còn sinh viên, đặt editedStudent là null
          }
          setMessage('Sinh viên đã được xóa!');
        })
        .catch(error => {
          console.error('Lỗi khi xóa sinh viên', error);
          setMessage('Có lỗi xảy ra khi xóa sinh viên.');
        });
      }
    } else {
      // Sử dụng Alert.alert cho di động
      Alert.alert(
        "Xác nhận xóa",
        "Bạn có chắc chắn muốn xóa sinh viên này?",
        [
          {
            text: "Hủy",
            style: "cancel"
          },
          {
            text: "Có",
            onPress: () => {
              // Tiến hành xóa sinh viên
              axios.put(`http://192.168.1.58:3000/api/quanLyTaiKhoanSV/capNhatThongTin/${editedStudent._id}`, {
                ...editedStudent, QUYENTK: 'unactive'
              })
              .then(response => {
                const updatedStudents = students.filter(student => student._id !== editedStudent._id);
                setStudents(updatedStudents);

                // Cập nhật lại editedStudent sau khi xóa
                if (updatedStudents.length > 0) {
                  setEditedStudent(updatedStudents[0]); // Chuyển sang sinh viên đầu tiên
                } else {
                  setEditedStudent(null); // Nếu không còn sinh viên, đặt editedStudent là null
                }
                setMessage('Sinh viên đã được xóa!');
              })
              .catch(error => {
                console.error('Lỗi khi xóa sinh viên', error);
                setMessage('Có lỗi xảy ra khi xóa sinh viên.');
              });
            }
          }
        ]
      );
    }
  };

  if (!students || students.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Không có sinh viên để hiển thị.</Text>
      </View>
    );
  }

  return (
   

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Danh Sách Sinh Viên</Text>
      {students.map((student) => (
        <View key={student._id} style={styles.studentRow}>
          {editedStudent?._id === student._id ? (
            // Nếu đây là sinh viên đang chỉnh sửa, hiển thị form chỉnh sửa trực tiếp tại vị trí này
            <View style={styles.formSection}>
              <Text>Tên Sinh Viên:</Text>
              <TextInput
                style={styles.input}
                value={editedStudent?.TENSV || ''}
                onChangeText={(text) => handleInputChange('TENSV', text)}
              />
              <Text>Ngày Sinh (DD/MM/YYYY):</Text>
              <TextInput
                style={styles.input}
                value={dateInput || '01/01/2000'}
                onChangeText={handleDateChange}
              />
              <Text>Địa Chỉ:</Text>
              <TextInput
                style={styles.input}
                value={editedStudent?.DIACHI || ''}
                onChangeText={(text) => handleInputChange('DIACHI', text)}
              />
              <Text>Email:</Text>
              <TextInput
                style={styles.input}
                value={editedStudent?.EMAIL || ''}
                onChangeText={(text) => handleInputChange('EMAIL', text)}
              />
              <Text>Giới Tính:</Text>
              <Picker
                selectedValue={editedStudent?.GIOITINH ? 'Nam' : 'Nữ'}
                onValueChange={handleGenderChange}
                style={styles.picker}
              >
                {genderOptions.map(gender => (
                  <Picker.Item key={gender} label={gender} value={gender} />
                ))}
              </Picker>
              <Button title="Cập Nhật" onPress={handleSubmit} />
            </View>
          ) : (
            <View style={styles.studentRow}>
              <Text>MSSV: {student.MSSV}</Text>
              <Text>Tên: {student.TENSV}</Text>
              <Text>Ngày Sinh: {formatDate(student.NGAYSINH)}</Text>
              <Text>Giới Tính: {student.GIOITINH ? 'Nam' : 'Nữ'}</Text>
              <Text>Quê Quán: {student.DIACHI}</Text>
              <Button title="Chỉnh sửa" onPress={() => handleEditClick(student)} />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  studentRow: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  formSection: {
    marginBottom: 15,
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
