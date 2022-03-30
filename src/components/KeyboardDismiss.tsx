import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";

const KeyboardDismiss = ({ children }) => {

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardDismiss;