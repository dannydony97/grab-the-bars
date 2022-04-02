import React from "react";
import { Button, KeyboardAvoidingView } from "react-native";
import { Carousel, Image, Incubator, View } from "react-native-ui-lib";
import ContentView from "../components/ContentView";
import KeyboardDismiss from "../components/KeyboardDismiss";
import DefaultStyles from "../styles/DefaultStyles";

const { TextField } = Incubator;

const PostDescription = ({ route, navigation }) => {

  const [photosUri, setPhotosUri] = React.useState<Array<string>>([]);
  const [caption, setCaption] = React.useState<string>("");

  React.useEffect(() => {
    setPhotosUri(route.params.selectedPhotosUri);
  }, []);

  const onShare = () => {
    console.log(photosUri);
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