import { View } from "react-native-ui-lib";
import DefaultStyles from "../styles/DefaultStyles";

const ContentView = ({ children }) => {
  return (
    <View style={DefaultStyles.outerView}>
      <View style={DefaultStyles.innerView}>
        {children}
      </View>
    </View>
  );
};

export default ContentView