import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';


import { AuthProvider } from './src/providers/AuthProvider';
import MainRoutes from './src/routes/MainRoutes';

export default function App() {

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <MainRoutes />
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}
