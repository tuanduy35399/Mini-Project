import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#33CCFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerTitleAlign: 'center',

      }}>
      <Stack.Screen name="index" options={{title: 'Home'}}/>
      <Stack.Screen name="KHHT" options={{title: 'Xem kế hoạch học tập'}} />
      <Stack.Screen name="editKHHT" options={{title: 'Sửa kế hoạch học tập'}}/>
      <Stack.Screen name="Khht2425HK1" options={{title: '2024-2025 HK1'}}/>
      <Stack.Screen name="Khht2425HK2" options={{title: '2024-2025 HK2'}}/>
    </Stack>
  );
}
