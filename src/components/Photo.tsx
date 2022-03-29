import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, Image, Colors } from "react-native-ui-lib";

interface PhotoProps {
  photoUri: string,
  width: string,
  onPress: (photoUri?: string) => void,
  select?: boolean
}

const Photo = (props: PhotoProps) => {

  const [photoStyle, setPhotoStyle] = React.useState({});

  const onPhotoPress = () => {
    props.onPress(props.photoUri);

    if(props.select !== undefined && props.select === true) {
      setPhotoStyle({
        ...photoStyle, 
        borderWidth: 3, 
        borderColor: Colors.primary
      });
    }
  }

  return (
    <TouchableOpacity
      style={{ width: props.width, aspectRatio: 1 / 1, justifyContent: "center", alignItems: "center" }}
      onPress={onPhotoPress}
    >
      <Image
        source={{ uri: props.photoUri }}
        style={{ width: "99%", height: "99%", ...photoStyle }}
      />
    </TouchableOpacity>);
};

const styles = StyleSheet.create({
  photo: {
    borderWidth: 0,
  }
});

export default Photo;