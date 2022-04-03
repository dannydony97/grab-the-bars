import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import SelectPhoto from "../screens/SelectPhoto";
import PostDescription from "../screens/PostDescription";

const Stack = createStackNavigator();

const ScreensStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
      >
        <Stack.Screen name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SelectPhoto" 
          component={SelectPhoto}
        />
        <Stack.Screen 
          name="PostDescription"
          component={PostDescription}
          options={{
            animationEnabled: false
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