import React from "react";
import { StyleSheet, Button } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import PhotoGridView from "../components/PhotoGridView";
import { Image, View } from "react-native-ui-lib";

const SelectPhoto = ({ navigation }) => {

  const [photosUri, setPhotosUri] = React.useState<Array<string>>([]);
  const [selectedPhotosUri, setSelectedPhotosUri] = React.useState<Array<string>>([]);

  React.useEffect(() => {

    const getAlbums = async () => {
      const result = await CameraRoll.getPhotos({
        first: 50,
        assetType: "Photos"
      });

      const photosUri: Array<string> = [];
  
      result.edges.map((edge) => {
        photosUri.push(edge.node.image.uri);
      });

      setPhotosUri(photosUri);
    }

    getAlbums();
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          title="Next" 
          onPress={() => navigation.navigate("PostDescription", {
            selectedPhotosUri: selectedPhotosUri
          })}
          disabled={selectedPhotosUri.length === 0 ? true : false} 
        />
      ),
    });
  }, [selectedPhotosUri]);

  const onPhotoPress = (uri: string) => {
    if(selectedPhotosUri.indexOf(uri) === -1)
      setSelectedPhotosUri([...selectedPhotosUri, uri]);
    else
      setSelectedPhotosUri(selectedPhotosUri.filter((photoUri) => photoUri !== uri))
  };

  return (
    <View flex>
      <View style={styles.currentPhotoWrapper}>
        <Image 
          source={{ 
            uri: selectedPhotosUri.length ? selectedPhotosUri[selectedPhotosUri.length - 1] : null }} 
          style={styles.photo} />
      </View>
      <PhotoGridView rowPhotos={4} photosUri={photosUri} onPhotoPress={onPhotoPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  currentPhotoWrapper: {
    height: "40%"
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  }
});

export default SelectPhoto;