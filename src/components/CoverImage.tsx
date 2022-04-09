import React from "react";
import { Alert, StyleSheet } from "react-native";
import { ImagePickerResponse, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { ActionSheet, Colors, Image, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib";

import { useUser } from "../providers/UserProvider";

interface CoverImageProps {
  height: number
}

const CoverImage = ({ height }: CoverImageProps) => {

  const { setCoverImage, getCoverImage, userDetails } = useUser();

  const [coverImageKey, setCoverImageKey] = React.useState<string | null>(userDetails.coverImageKey);
  const [coverImageURI, setCoverImageURI] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [visibleActionSheet, setVisibleActionSheet] = React.useState<boolean>(false);

  const onUseCameraPress = () => {
    launchCamera({
      mediaType: "photo",
      saveToPhotos: false,
    }, (response) => {
      setLoading(true);
      processResponse(response);
      setVisibleActionSheet(false);
    });
  }

  const onUseGalleryPress = () => {
    launchImageLibrary({
      mediaType: "photo"
    }, (response) => {
      setLoading(true);
      processResponse(response);
      setVisibleActionSheet(false);
    });
  }

  const processResponse = async (response: ImagePickerResponse) => {
    switch (response?.errorCode) {
      case "camera_unavailable": Alert.alert("Camera is not available"); break;
      case "permission": Alert.alert("There is no permission to access the camera"); break;
      case "others": Alert.alert("Unknown error occured!"); break;
    }
    if (response.errorCode !== undefined) {
      return;
    }

    const imageURI = response?.assets[0].uri;
    if (imageURI === undefined) {
      console.error("Undefined URI image!");
      return;
    }

    const key = await setCoverImage(imageURI);
    setCoverImageKey(key);
  }

  React.useEffect(() => {

    if(coverImageKey === null) {
      setLoading(false);
      return;
    }

    const fetchCoverImageURI = async () => { 
      setCoverImageURI(await getCoverImage());
      setLoading(false);
    }
    fetchCoverImageURI();

  }, [coverImageKey]);

  return (
    <>
      <TouchableOpacity
        style={{ width: "100%", height: height, backgroundColor: "#c5c5c5", justifyContent: "center", alignItems: "center" }}
        onPress={() => setVisibleActionSheet(true)}
      >
        {coverImageURI === null && <Text text70T white>Add cover image...</Text>}
        {coverImageURI !== null && <Image source={{ uri: coverImageURI }} style={{ width: "100%", height: "100%" }} />}
        {loading && <LoaderScreen color={Colors.grey80} style={{position: "absolute", bottom: height/2 - 20}} /> }
      </TouchableOpacity>
      <ActionSheet
        visible={visibleActionSheet}
        message={"Add cover image..."}
        title={"Add cover image..."}
        options={[
          { label: "Use camera", onPress: onUseCameraPress },
          { label: "Upload from gallery", onPress: onUseGalleryPress }
        ]}
        onModalDismissed={() => setVisibleActionSheet(false)}
      />
    </>
  );

};

const styles = StyleSheet.create({
  noCoverImage: {

  }
});

export default CoverImage;