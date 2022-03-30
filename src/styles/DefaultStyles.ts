import { StyleSheet } from "react-native";
import { Colors } from "react-native-ui-lib";

const DefaultStyles = StyleSheet.create({
    underLineTextField: {
        borderBottomWidth: 1,
        borderColor: Colors.$outlineDisabledHeavy,
        paddingBottom: 4,
    },
    outerView: {
        alignItems: "center",
        flex: 1,
    },
    innerView: {
        width: "90%",
        flex: 1,
    },
});

export default DefaultStyles;