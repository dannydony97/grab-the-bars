import React from "react";
import { Button } from "react-native";
import { Carousel, Image, Incubator, View } from "react-native-ui-lib";
import ContentView from "../components/ContentView";
import KeyboardDismiss from "../components/KeyboardDismiss";
import DefaultStyles from "../styles/DefaultStyles";

import { Storage } from "aws-amplify";

const { TextField } = Incubator;

const PostDescription = ({ route, navigation }) => {

  const photosUri = route.params.selectedPhotosUri;

  const [caption, setCaption] = React.useState<string>("");

  const onShare = async () => {

    const image = await fetch(photosUri[0]);
    const blob = await image.blob();

    const result = await Storage.put(`image_` + Date.now(), blob, {
      contentType: "image/jpeg"
    });
    console.log(result);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Share"
          onPress={onShare}
        />
      ),
    });
  }, []);

  return (
    <KeyboardDismiss>
      <ContentView>
        <Carousel style={{ height: "40%" }} showCounter>
          {
            photosUri.map((photoUri: string) => {
              return <Image source={{ uri: photoUri }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
            })
          }
        </Carousel>
        <TextField
          text60T
          placeholder="Write a caption..."
          fieldStyle={DefaultStyles.underLineTextField}
          value={caption}
          onChangeText={(value) => setCaption(value)}
        />
      </ContentView>
    </KeyboardDismiss>
  );
};

export default PostDescription;