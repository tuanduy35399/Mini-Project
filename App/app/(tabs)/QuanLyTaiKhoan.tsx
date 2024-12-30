import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const QuanLyTaiKhoan = () => {
  return (
    <View style={styles.container}>
      <Link href="/(tabs)/TaoTaiKhoan" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>TaoTaiKhoan</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/(tabs)/CapNhatThongTin" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CapNhatThongTin</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default QuanLyTaiKhoan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal: 15,
    borderColor: '#388E3C',
    borderWidth: 2,
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});







