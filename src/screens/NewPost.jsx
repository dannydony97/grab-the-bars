import React from "react";
import { CameraRoll } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "react-native-ui-lib";

const NewPost = ({ navigation }) => {

    React.useEffect(() => {
        CameraRoll.getPhotos
    });

    return (
        <View>
            <ScrollView>

            </ScrollView>
        </View>
    );
};

export default NewPost;