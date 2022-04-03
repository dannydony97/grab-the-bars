import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text } from "react-native";
import { UserProvider } from "../providers/UserProvider";
import Profile from "./Profile";

const Feed = () => <Text>This is feed</Text>;

const Home = (props) => {
  return (
    <UserProvider>
      <WrappedHome {...props} />
    </UserProvider>
  );
}

const Tab = createBottomTabNavigator();
const WrappedHome = ({ navigation }) => {
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
            <Button title="Add" onPress={() => navigation.navigate("SelectPhoto")} />
          )
        })}
      />
    </Tab.Navigator>
  );
};

export default Home;