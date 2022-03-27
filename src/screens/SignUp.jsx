import React from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Incubator, Text, Button, Colors } from "react-native-ui-lib";
import { useAuth } from "../providers/AuthProvider";

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");

  const [passwordVisivle, setPasswordVisible] = React.useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = React.useState(false);

  const [validUserName, setValidUserName]                  = React.useState(true);
  const [validEmailAddress, setValidEmailAddress]          = React.useState(true);
  const [validPassword, setValidPassword]                  = React.useState(true);
  const [repeatValidPassword, setValidRepeatValidPassword] = React.useState(true);

  const { registerUser } = useAuth();

  const validateUserName = (value) => {
    return true;
  };

  const validateEmailAddress = (value) => {
    return true;
  };

  const onCreateAccountButtonPressed = () => {
      
    try {

      if(!validUserName || !userName.length)
        throw("User name error! Please check!");

      if(!validEmailAddress || !emailAddress.length)
        throw("Email address error! Please check!");

      if(!validPassword || !password.length)
        throw("Password error! Please check!");

      if(!repeatValidPassword || !repeatPassword.length)
        throw("Password error! Please check!");

    } catch(err) {
      Alert.alert("Error", err);
    }

    try {
      registerUser(userName, emailAddress, password);
    } catch(err) {
      Alert.alert("Error", err.message);
    }

  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.signUpView}>
          <View style={styles.innerView}>
            <Text style={styles.title}>Let's get started!</Text>
            <Text style={styles.subtitle}>Create an account to social app</Text>
            <Incubator.TextField
              preset="default"
              placeholder="User name"
              floatingPlaceholder
              value={userName}
              onChangeText={(value) => setUserName(value)}
              enableErrors
              validate={['required', (value) => validateUserName(value)]}
              validationMessage={['Field is required!', 'This user name already exists!']}
              validateOnBlur
              onChangeValidity={(isValid) => setValidUserName(isValid)}
            />
            <Incubator.TextField
              preset="default"
              placeholder="Email Address"
              floatingPlaceholder
              value={emailAddress}
              onChangeText={(value) => setEmailAddress(value)}
              enableErrors
              validate={['required', 'email', (value) => validateEmailAddress(value)]}
              validationMessage={['Field is required!', 'Email is invalid', 'This email address is already used!']}
              validateOnBlur
              onChangeValidity={(isValid) => setValidEmailAddress(isValid)}
            />
            <Incubator.TextField
              preset="default"
              placeholder="Password"
              floatingPlaceholder
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!passwordVisivle}
              enableErrors
              validate={['required', (value) => value.length >= 8]}
              validationMessage={['Field is required!', 'Password is too short!']}
              validateOnChange
              onChangeValidity={(isValid) => setValidPassword(isValid)}
            />
            <Incubator.TextField
              preset="default"
              placeholder="Repeat password"
              floatingPlaceholder
              value={repeatPassword}
              onChangeText={(value) => setRepeatPassword(value)}
              secureTextEntry={!repeatPasswordVisible}
              enableErrors
              validate={['required', (value) => password === value]}
              validationMessage={['Field is required!', 'Passwords does not match!']}
              validateOnChange
              onChangeValidity={(isValid) => setValidRepeatValidPassword(isValid)}
            />
            <View style={styles.line} />
            <Button
              label="CREATE ACCOUNT"
              onPress={() => onCreateAccountButtonPressed()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  signUpView: {
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
  },
  subtitle: {
    marginBottom: 30,
  },
  innerView: {
    width: "90%",
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginTop: 20,
    marginBottom: 10,
  },
  withUnderline: {
    height: 30,
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDisabledHeavy,
    paddingBottom: 4
  }
});

export default SignUp;
