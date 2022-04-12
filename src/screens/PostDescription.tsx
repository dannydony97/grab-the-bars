import React from "react";
import { Button } from "react-native";
import { Carousel, Image, Incubator, View } from "react-native-ui-lib";
import ContentView from "../components/ContentView";
import KeyboardDismiss from "../components/KeyboardDismiss";
import DefaultStyles from "../styles/DefaultStyles";

const { TextField } = Incubator;

import { usePost } from "../providers/PostProvider";

const PostDescription = ({ route, navigation }) => {

  const photosUri = route.params.selectedPhotosUri;
  const { share } = usePost();

  const [caption, setCaption] = React.useState<string>("");

  const onShare = async () => {
    try {
      await share(photosUri, caption);
    } catch (err) {
      console.error(err);
    }
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

  console.log(caption);
  return (
    <KeyboardDismiss>
      <ContentView>
        <Carousel style={{ height: "40%" }} showCounter>
          {
            photosUri.map((photoUri: string, index: number) => {
              return <Image key={index} source={{ uri: photoUri }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
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