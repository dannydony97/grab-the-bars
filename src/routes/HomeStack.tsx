import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text } from "react-native";
import Profile from "../screens/Profile";

import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from "react-native-ui-lib";

const Feed = () => <Text>This is feed</Text>;

const Tab = createBottomTabNavigator();
const HomeStack = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="MyProfile" component={Profile}
        options={({ navigation }) => ({
          title: "",
          headerRight: () => (
            <TouchableOpacity 
              style={{backgroundColor: "white", borderRadius: 20, padding: 5, marginRight: 10}}
              onPress={() => navigation.navigate("AddPostStack")}  
            >
              <Feather name="plus" color="black" size={30} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          headerTransparent: true,
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;