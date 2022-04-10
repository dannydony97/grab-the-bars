import { createStackNavigator } from "@react-navigation/stack";

import SelectPhoto from "../screens/SelectPhoto";
import PostDescription from "../screens/PostDescription";

const Stack = createStackNavigator();

const AddPostStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectPhoto"
    >
      <Stack.Screen
        name="SelectPhoto"
        component={SelectPhoto}
        options={{
          title: "Select Photo"
        }}
      />
      <Stack.Screen
        name="PostDescription"
        component={PostDescription}
        options={{
          title: "Description"
        }}
      />
    </Stack.Navigator>
  );
};

export default AddPostStack;