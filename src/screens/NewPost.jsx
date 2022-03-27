import CameraRoll from "@react-native-community/cameraroll";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Image, View } from "react-native-ui-lib";

const NewPost = ({ navigation }) => {

  const [photos, setPhotos] = React.useState([]);

  React.useEffect(async () => {
    await getAlbums();
  }, []);

  React.useEffect(() => {
    console.log(photos);
  }, [photos])

  const getAlbums = async () => {
    const result = await CameraRoll.getPhotos({
      first: 50,
      assetType: "Photos"
    });
    setPhotos(result.edges);

    const uri = result.edges[0].node.image.uri;
    console.log(uri);
  }

  return (
    <View>
      <ScrollView>
        {photos.map((photo, index) => {
          return <Image key={index} style={{width: 100, height: 100}} source={{ uri: photo.node.image.uri }} />
        })}
      </ScrollView>
    </View>
  );
};

export default NewPost;