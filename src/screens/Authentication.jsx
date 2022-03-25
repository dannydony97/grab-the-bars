import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Stack = createStackNavigator();

const Authentication = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  );
};

export default Authentication;