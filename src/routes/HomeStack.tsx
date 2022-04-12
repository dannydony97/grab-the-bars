import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text } from "react-native";
import Profile from "../screens/Profile";

const Feed = () => <Text>This is feed</Text>;

const Tab = createBottomTabNavigator();
const HomeStack = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed}
        options={{
          title: "Feed"
        }}
      />
      <Tab.Screen name="MyProfile" component={Profile}
        options={({ navigation }) => ({
          title: "My Profile",
          headerRight: () => (
            <Button title="Add" onPress={() => navigation.navigate("AddPostStack")} />
          )
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;