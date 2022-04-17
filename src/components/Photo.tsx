import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, Image, Colors } from "react-native-ui-lib";

interface PhotoProps {
  URI: string,
  width: string,
  onPress: (photoUri?: string) => void,
  select?: boolean
}

const Photo = (props: PhotoProps) => {

  const [photoStyle, setPhotoStyle] = React.useState({});
  const [selected, setSelected] = React.useState(false);

  const onPhotoPress = () => {
    props.onPress(props.URI);

    if(props.select !== undefined && props.select === true) {

      if(!selected) {
        setPhotoStyle({
          ...photoStyle, 
          borderWidth: 3, 
          borderColor: Colors.primary
        });
        setSelected(true);
      } else {
        setPhotoStyle({
          ...photoStyle, 
          borderWidth: 0, 
          borderColor: Colors.primary
        });
        setSelected(false);
      }
    }
  }

  return (
    <TouchableOpacity
      style={{ width: props.width, aspectRatio: 1 / 1, justifyContent: "center", alignItems: "center" }}
      onPress={onPhotoPress}
    >
      <Image
        source={{ uri: props.URI }}
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