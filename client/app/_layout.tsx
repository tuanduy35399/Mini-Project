// app/_layout.tsx
import { Slot } from 'expo-router';
import { SessionProvider } from '../ctx';

export default function Root() {
  return (
    <SessionProvider>
      {/* Slot để xử lý các route con */}
      <Slot />
    </SessionProvider>
  );
}
