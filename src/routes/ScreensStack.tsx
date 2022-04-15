import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from "./HomeStack";
import AddPostStack from "./AddPostStack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { UserProvider } from "../providers/UserProvider";
import { PostProvider } from "../providers/PostProvider";

const Stack = createStackNavigator();

const ScreensStack = () => {
  return (
    <UserProvider>
      <PostProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignIn"
          >
            <Stack.Screen
              name="AddPostStack"
              component={AddPostStack}
              options={{
                presentation: "modal",
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Home"
              component={HomeStack}
              options={{ headerShown: false }}
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
      </PostProvider>
    </UserProvider>
  );
};

export default ScreensStack;