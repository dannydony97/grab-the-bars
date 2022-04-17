import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Carousel, Image, Text, View } from "react-native-ui-lib";
import { downloadMedia } from "../app-exports";
import { usePost } from "../providers/PostProvider";
import { PostDetails } from "../schemas/Post";

const ProfileCards = ({ route, navigation }) => {

  const { getDetails } = usePost();

  const [postsDetails, setPostsDetails] = React.useState<Array<PostDetails>>([]);
  const [mediasURIs, setMediasURIs] = React.useState<Array<Array<string>>>([]);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  React.useEffect(() => {
    if(!postsDetails.length) {
      return;
    }

    fetchMediasURIs();

  }, [postsDetails]);

  const fetchPosts = async () => {
    try {
      setPostsDetails(await getDetails());
    } catch (err) {
      console.error(err);
    }
  }

  const fetchMediasURIs = async () => {
    const mediasURIs = await Promise.all(postsDetails.map(async postDetails => {
      const mediaURIs = await downloadMedia(postDetails.mediaKeys);
      return mediaURIs;
    }));

    setMediasURIs(mediasURIs);
  }

  const getURI = async (mediaKey) => {
    const [URI] = await downloadMedia([mediaKey]);
    return URI;
  }

  return (
    <ScrollView>
      {
        mediasURIs.length !== 0 && postsDetails.map((postDetails, index1) => (
          <Card flex center key={index1} style={{height: 400, marginBottom: 40, marginLeft: 5, marginRight: 5}}>
            <Carousel>
              {
                postDetails.mediaKeys.map((mediaKey, index2) => (<Image key={index2} source={{uri: mediasURIs[index1][index2]}} style={{width: "80%", height: "80%"}} />))
              }
            </Carousel>
          </Card>
        ))
      }
    </ScrollView>
  );
};

export default ProfileCards;