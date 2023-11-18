import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './app/context/auth-context';
import { NavigationLayout } from './app/layout/navigation-layout';

export default function App() {
  return (
    <AuthProvider>
      <NavigationLayout>
        
      </NavigationLayout>
    </AuthProvider>
  );
}



