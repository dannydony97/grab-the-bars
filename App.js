import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { AuthProvider } from './src/providers/AuthProvider';
import ScreensStack from './src/routes/ScreensStack';

import { Amplify } from 'aws-amplify';
import config from "./src/aws-exports";
Amplify.configure(config);

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

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
