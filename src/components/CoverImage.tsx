import React from "react";
import { StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { ActionSheet, Button, Text, TouchableOpacity, View } from "react-native-ui-lib";

import { useUser } from "../providers/UserProvider";

interface CoverImageProps {
  height: number
}

const CoverImage = ({ height }: CoverImageProps) => {

  const [ profileImage ] = React.useState<boolean>(false);

  const [visibleActionSheet, setVisibleActionSheet] = React.useState<boolean>(false);

  const onUseCameraPress = () => {

  }

  const onUseGalleryPress = () => {
    launchImageLibrary({
      mediaType: "photo"
    }, (response) => {
      console.log(response);

      setVisibleActionSheet(false);
    });
  }

  return (
    <TouchableOpacity 
      style={{width: "100%", height: height, backgroundColor: "#c5c5c5", justifyContent: "center", alignItems: "center"}}
      onPress={() => setVisibleActionSheet(true)}
    >
      <Text text70T white>Add cover image...</Text>
      <ActionSheet
        visible={visibleActionSheet}
        message={"Add cover image..."}
        title={"Add cover image..."}
        options={[
          {label: "Use camera", onPress: onUseCameraPress},
          {label: "Upload from gallery", onPress: onUseGalleryPress}
        ]}
        onModalDismissed={() => setVisibleActionSheet(false)}
      />
    </TouchableOpacity>
  );

};

const styles = StyleSheet.create({
  noCoverImage: {
    
  }
});

export default CoverImage;