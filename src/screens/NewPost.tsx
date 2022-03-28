import React from "react";
import CameraRoll from "@react-native-community/cameraroll";
import PhotoGridView from "../components/PhotoGridView";

const NewPost = ({ navigation }) => {

  const [photosUri, setPhotosUri] = React.useState<Array<string>>([]);
  const [currentPhotUri, setCurrentPhotUri] = React.useState<string>();

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

  return (
    <PhotoGridView rowPhotos={4} photosUri={photosUri} />
  );
};

export default NewPost;