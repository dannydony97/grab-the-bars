import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';


import { AuthProvider } from './src/providers/AuthProvider';
import Authentication from './src/screens/Authentication';

export default function App() {

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Authentication />
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}
