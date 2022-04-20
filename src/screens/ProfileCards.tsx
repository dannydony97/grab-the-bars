import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Carousel, Image, Text, View } from "react-native-ui-lib";
import { downloadMedia } from "../app-exports";
import { usePost } from "../providers/PostProvider";
import { PostDetails } from "../schemas/Post";

interface MediaContentProps {
  URIs: Array<string>;
}

const MediaContent = ({ URIs }: MediaContentProps) => {
  return (
    <View style={{width: "100%", height: "100%"}}>
      {URIs.length > 1 &&
        <Carousel>
          {
            URIs.map(((URI, index) => (
              <Card.Image key={index} source={{ uri: URI }} style={styles.media} />
            )))
          }
        </Carousel>}
      {URIs.length === 1 &&
        <Card.Image source={{ uri: URIs[0] }} style={styles.media} />}
    </View>
  );
}

const ProfileCards = ({ route, navigation }) => {

  const { getDetails } = usePost();

  const [postsDetails, setPostsDetails] = React.useState<Array<PostDetails>>([]);
  const [mediasURIs, setMediasURIs] = React.useState<Array<Array<string>>>([]);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  React.useEffect(() => {
    if (!postsDetails.length) {
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
      <StatusBar style="dark" />
      {
        mediasURIs.length !== 0 && postsDetails.map((postDetails, index) => (
          <Card flex center key={index} style={{ height: 400, marginBottom: 40, marginLeft: 5, marginRight: 5 }}>
            <MediaContent URIs={mediasURIs[index]} />
          </Card>
        ))
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  media: {
    height: 300,
    flex: 1,
    width: null,
    borderWidth: 3
  }
});

export default ProfileCards;