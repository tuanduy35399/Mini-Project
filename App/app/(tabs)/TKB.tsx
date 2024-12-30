import React, { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeekCalendar from '../../components/TKB/WeekCalendar';
import { addDays, getDay } from 'date-fns';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import axios from 'axios'

// Định nghĩa kiểu cho Props của TKB
type TKBProps = {
  TENGV: string;
  TENHP: string;
  TIETBATDAU: number;
  SOTIET: number;
}

const TKB: React.FC<TKBProps> = ({ TENGV, TENHP, TIETBATDAU, SOTIET }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.thu}>{TENGV}</Text>
      <Text style={styles.monhoc}>Môn học: {TENHP}</Text>
      <Text style={styles.giohoc}>Tiết học: {TIETBATDAU} - {TIETBATDAU + SOTIET - 1} </Text>
    </View>
  );
}

type LopHocPhan = {
  MALOPHP: string;
  GIANGVIEN: { TENGV: string };
  TENHP: string;
  TIETBATDAU: number;
  SOTIET: number;
  THUTRONGTUAN: number;
}

const TKBAPP: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [danhSachHocPhan, setDanhSachHocPhan] = useState<LopHocPhan[]>([]); // Chỉ định kiểu cho danh sách học phần

  useEffect(() => {
    axios.get<LopHocPhan[]>('http://192.168.1.58:3000/api/lopHocPhan')
      .then((res) => {
        setDanhSachHocPhan(res.data);
        console.log(res.data);
      })
      .catch(() => {
        return;
      });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={{ ...styles.buttonText }}>Home</Text>
        </TouchableOpacity>
      </Link>
      <Text style={styles.title}>Thời khóa biểu hiện tại</Text>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
        <View>
          <TouchableOpacity style={styles.NUT} onPress={() => setDate(addDays(date, 7))}>
            <Text>Tuần sau</Text>
            <Feather name="arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.NUT} onPress={() => setDate(addDays(date, -7))}>
            <Feather name="arrow-left" size={24} color="black" />
            <Text>Tuần trước</Text>
          </TouchableOpacity>
        </View>
      </View>
      <WeekCalendar date={date} onChange={(newDate) => setDate(newDate)} />
      <FlatList
        data={danhSachHocPhan}
        renderItem={({ item }) => (
          item.THUTRONGTUAN === getDay(date) ?
            <TKB
              TENGV={item.GIANGVIEN.TENGV}
              TENHP={item.TENHP}
              TIETBATDAU={item.TIETBATDAU}
              SOTIET={item.SOTIET}
            />
            : <Text></Text>
        )}
        keyExtractor={(item) => item.MALOPHP}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#CCFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  thu: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  monhoc: {
    fontSize: 16,
    color: '#555',
  },
  giohoc: {
    fontSize: 14,
    color: '#888',
  },
  NUT: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderColor: '#2F4F4F',
    borderWidth: 2,
    borderRadius: 5,
    elevation: 10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16, 
    fontWeight: '600', 
    color: '#fff', 
    textAlign: 'center',
  }, 
  button: {
    backgroundColor: 'blue', 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    marginHorizontal: 15, 
    borderColor: 'white', 
    borderWidth: 2,
    borderRadius: 8, 
    elevation: 5, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
})

export default TKBAPP;
