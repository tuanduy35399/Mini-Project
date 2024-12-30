import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';  // Import Picker mới

// Define Account type
interface Account {
  MSSV: string;
  TENSV: string;
  NGAYSINH: string;
  DIACHI: string;
  GIOITINH: boolean; // true: Nam, false: Nữ
  EMAIL: string;
  MATKHAU: string;
  QUYENTK: string;
}

const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
}

const TaoTaiKhoan: React.FC = () => {
  // Define states with proper types
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [TENSV, setTensv] = useState<string>(''); 
  const [EMAIL, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [DIACHI, setDiachi] = useState<string>(''); 
  const [GIOITINH, setGioitinh] = useState<boolean>(true); 
  const [NGAYSINH, setNgaysinh] = useState<string>(''); 
  const [validDate, setValidDate] = useState<boolean>(true);
  const [totalStudents, setTotalStudents] = useState<number>(0); 


  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await axios.get<[]>('http://192.168.1.58:3000/api/quanLyTaiKhoanSV/capNhatThongTin')
        setTotalStudents(response.data.length);  // Assuming the API returns the total number of students
      } catch (error) {
        console.error("Lỗi khi lấy tổng số sinh viên:", error);
      }
    };

    fetchTotalStudents();
  }, []);
  
  // Generate MSSV for the new account
  const generateMSSV = (): string => {
    const nextId = totalStudents + 1;
    return `SV${nextId.toString().padStart(5, '0')}`;
  };

  // Register account
  const handleRegister = async (): Promise<void> => {
    if (!TENSV || !EMAIL || !password || !DIACHI || !NGAYSINH) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(EMAIL)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải ít nhất 6 ký tự!");
      return;
    }

    if (!validDate) {
      Alert.alert("Lỗi", "Ngày sinh không hợp lệ!");
      return;
    }

    const MSSV = generateMSSV();
    console.log(NGAYSINH);
    const newAccount: Account = { MSSV, TENSV, NGAYSINH, DIACHI, GIOITINH, EMAIL, MATKHAU: password, QUYENTK: 'active' };
    console.log(newAccount)
    try {
      // Gửi dữ liệu lên server
      const response = await axios.post('http://192.168.1.58:3000/api/quanLyTaiKhoanSV/taoTaiKhoan', newAccount);
      if (response.status === 201) {
        Alert.alert("Thành công", `Tạo tài khoản sinh viên thành công! Mã số sinh viên: ${MSSV}`);
        setAccounts(prevAccounts => [...prevAccounts, newAccount]);
        setTensv('');
        setEmail('');
        setPassword('');
        setDiachi('');
        setNgaysinh('');
        setGioitinh(true);
        setValidDate(true);
      }
    } catch (err) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tạo tài khoản!");
      console.error(err);
    }
  };

  // Handle the date input change
  const handleDateChange = (date: string): void => {
    setNgaysinh(date);
  };

  // Handle the blur event to validate the date
  const handleBlur = (): void => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = NGAYSINH.match(dateRegex);
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);

      const dateObject = new Date(year, month - 1, day);

      if (dateObject.getDate() === day && dateObject.getMonth() + 1 === month && dateObject.getFullYear() === year) {
        setValidDate(true);
      } else {
        setValidDate(false);
      }
    } else {
      setValidDate(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tạo tài khoản sinh viên</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={TENSV}
        onChangeText={setTensv}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="EMAIL-address"
        value={EMAIL}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={DIACHI}
        onChangeText={setDiachi}
      />

      <Text style={styles.label}>Ngày sinh (DD/MM/YYYY)</Text>
      <TextInput
        style={[styles.input, !validDate && styles.invalidInput]}
        placeholder="Nhập ngày sinh"
        value={NGAYSINH}
        onChangeText={handleDateChange}
        onBlur={handleBlur} // Kiểm tra tính hợp lệ khi mất focus
      />

      {!validDate && <Text style={styles.errorText}>Ngày sinh không hợp lệ!</Text>}

      <Text style={styles.label}>Giới tính</Text>
      <Picker
        selectedValue={GIOITINH}
        style={styles.input}
        onValueChange={(itemValue) => setGioitinh(itemValue)}
      >
        <Picker.Item label="Nam" value={true} />
        <Picker.Item label="Nữ" value={false} />
      </Picker>

      <Button title="Tạo tài khoản" onPress={handleRegister} />

      {/* <View style={styles.accountList}>
        <Text style={styles.accountListHeader}>Danh sách tài khoản sinh viên:</Text>
        {accounts.map((account, index) => (
          <Text key={index} style={styles.accountText}>
            {`MSSV: ${account.MSSV}, Tên: ${account.TENSV}, Email: ${account.EMAIL}, Giới tính: ${account.GIOITINH ? 'Nam' : 'Nữ'}`}
          </Text>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  accountList: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  accountListHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TaoTaiKhoan;
