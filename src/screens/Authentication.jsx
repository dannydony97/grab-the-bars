import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "./SignIn";

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
    </Stack.Navigator>
  );
};

export default Authentication;