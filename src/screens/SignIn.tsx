import React from "react";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, StyleSheet, Alert } from "react-native";
import { View, Text, Incubator, Colors, Checkbox, Button } from 'react-native-ui-lib';
import { useAuth } from "../providers/AuthProvider";
import DefaultStyles from "../styles/DefaultStyles";
import KeyboardDismiss from "../components/KeyboardDismiss";
import ContentView from "../components/ContentView";
const { TextField } = Incubator;

const SignIn = ({ navigation }) => {

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [keepSignedIn, setKeepSignedIn] = React.useState(false);

  const { signIn } = useAuth();

  const onSignInButtonPressed = async () => {

    try {
      await signIn(emailAddress, password);
      navigation.navigate("Home", { screen: "Feed" });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <KeyboardDismiss>
      <ContentView>
        <Text text30 marginT-30 marginB-10>Grab The Bars</Text>
        <TextField
          text65
          fieldStyle={DefaultStyles.underLineTextField}
          containerStyle={{ paddingBottom: 20 }}
          placeholder="Email address"
          floatingPlaceholder
          value={emailAddress}
          onChangeText={(text) => setEmailAddress(text)}
        />
        <TextField
          text65
          fieldStyle={DefaultStyles.underLineTextField}
          containerStyle={{ paddingBottom: 40 }}
          placeholder="Password"
          floatingPlaceholder
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Checkbox
          label="Keep me signed in"
          value={keepSignedIn}
          onValueChange={() => setKeepSignedIn(!keepSignedIn)}
        />
        <View style={styles.line} />
        <Button
          label="SIGN IN"
          enableShadow
          onPress={onSignInButtonPressed}
        />
        <Button
          style={styles.forgotTextButton}
          label="Forgot password?"
          link
        />
        <Text text80T marginT-10 marginB-10>Don't have an account?</Text>
        <Button
          label="SIGN UP"
          enableShadow
          outline
          outlineWidth={2}
          onPress={() => navigation.navigate("SignUp")}
        />
      </ContentView>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "gray",
    marginTop: 15,
    marginBottom: 15,
  },
  forgotTextButton: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: 0
  },
});

export default SignIn;