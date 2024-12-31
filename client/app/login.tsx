import { router } from 'expo-router';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { useSession } from '../ctx';
import { useState } from 'react';
import axios from 'axios';

export default function SignIn() {
    const { signIn } = useSession();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://192.168.1.131:3000/api/sinhvien/login', { username, password });
            if (response.data.token) {
                signIn(response.data.token);
                Alert.alert("Đăng nhập thành công!");
                router.replace('/(app)/');
            } else {
                Alert.alert('Lỗi', 'Sai tài khoản hoặc mật khẩu');
            }
        } catch (err: unknown) {
            // Kiểm tra nếu error là một AxiosError
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    Alert.alert(err.response.data.message || 'Có lỗi xảy ra');
                } else if (err.request) {
                    Alert.alert('Lỗi', 'Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng.');
                }
            } else {
                // Xử lý cho các lỗi khác (không phải từ Axios)
                Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput
                style={styles.input}
                placeholder="Tài khoản"
                value={username}
                onChangeText={setUsername}
                keyboardType="email-address"
                clearButtonMode="while-editing"
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                clearButtonMode="while-editing"
            />
            <Button
                title={isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                onPress={handleLogin}
                disabled={isLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});
