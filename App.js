import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';


import { AuthProvider } from './src/providers/AuthProvider';
import ScreensStack from './src/routes/ScreensStack';

export default function App() {

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScreensStack />
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}
