import React from "react";
import { StyleSheet } from "react-native";
import { Button, View } from "react-native-ui-lib";

import { useUser } from "../providers/UserProvider";

interface CoverImageProps {
  height: number
}

const CoverImage = ({ height }: CoverImageProps) => {

  const [ profileImage ] = React.useState<boolean>(false);

  return (
    <View style={{width: "100%", height: height, backgroundColor: "#c5c5c5", justifyContent: "center"}}>
      <Button label="Add cover image..." backgroundColor="transparent" />
    </View>
  );

};

const styles = StyleSheet.create({
  noCoverImage: {
    
  }
});

export default CoverImage;