import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text } from "react-native";

const Feed = () => <Text>This is feed</Text>;
const MyProfile = () => <Text>This is My Profile</Text>;

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed}
        options={{ 
          title: "Feed"
        }}
      />
      <Tab.Screen name="MyProfile" component={MyProfile}
        options={({navigation}) => ({
          title: "My Profile",
          headerRight: () => (
            <Button title="Add" onPress={() => navigation.navigate("SelectPhoto")}/>
          )
        })}
      />
    </Tab.Navigator>
  );
};

export default Home;