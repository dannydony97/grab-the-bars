import React from "react";
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { View, Text, Incubator, Colors, Checkbox, Button } from 'react-native-ui-lib';
import { useAuth } from "../providers/AuthProvider";
const { TextField } = Incubator;

const SignIn = ({navigation}) => {

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [keepSignedIn, setKeepSignedIn] = React.useState(false);

  const { signIn } = useAuth();

  const onSignInButtonPressed = () => {
    signIn(emailAddress, password);
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.logInView}>
          <View style={styles.innerView}>
            <Text text30 marginT-30 marginB-10>Grab The Bars</Text>
            <TextField
              text65
              fieldStyle={styles.withUnderline}
              containerStyle={{paddingBottom: 20}}
              placeholder="Email address"
              floatingPlaceholder
              value={emailAddress}
              onChangeText={(text) => setEmailAddress(text)}
            />
            <TextField
              text65
              fieldStyle={styles.withUnderline}
              containerStyle={{paddingBottom: 40}}
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logInView: {
    alignItems: "center",
    flex: 1,
  },
  innerView: {
    width: "90%",
  },
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
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDisabledHeavy,
    paddingBottom: 4
  },
});

export default SignIn;