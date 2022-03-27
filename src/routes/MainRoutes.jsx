import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import NewPost from "../screens/NewPost";

const Stack = createStackNavigator();

const MainRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
      >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="NewPost" component={NewPost} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;