import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import AddPostStack from "./AddPostStack";

const Stack = createStackNavigator();

const ScreensStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
      >
        <Stack.Screen
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddPostStack" 
          component={AddPostStack}
          options={{
            headerShown: false,
            presentation: "modal"
          }}
        />
        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreensStack;