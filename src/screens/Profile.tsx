import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Text, View } from "react-native-ui-lib";
import { downloadMedia } from "../app-exports";
import CoverImage from "../components/CoverImage";
import PhotoGridView from "../components/PhotoGridView";
import { usePost } from "../providers/PostProvider";
import { useUser } from "../providers/UserProvider";
import { PostDetails } from "../schemas/Post";

const noProfilePicture = require("../assets/no-profile-picture.png");

interface ProfileInfoProps {
  count: number;
  text: string
}

const ProfileInfo = ({ count, text }: ProfileInfoProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text text60>{count}</Text>
      <Text>{text}</Text>
    </View>
  );
}

const Profile = () => {

  const { userDetails } = useUser();
  const { getDetails } = usePost();

  const [profilePicture, setProfilePicture] = React.useState(noProfilePicture);

  const [coverImageHeight] = React.useState<number>(200);
  const [profileImageSize] = React.useState<number>(90);
  const [radius] = React.useState<number>(25);
  const [followingCount] = React.useState<number>(userDetails.following.length);
  const [followersCount] = React.useState<number>(userDetails.followers.length);
  const [postsCount] = React.useState<number>(userDetails.postIDs.length);

  const [postsDetails, setPostsDetails] = React.useState<Array<PostDetails>>([]);
  const [mediaURIs, setMediaURIs] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  React.useEffect(() => {
    const fetchMedia = async () => {
      const URIs = await Promise.all(postsDetails.map(async postDetails => {
        const [URI] = await downloadMedia([postDetails.mediaKeys[0]]);
        return URI;
      }));
      setMediaURIs(URIs);
    }

    fetchMedia();
  }, [postsDetails]);

  const fetchPosts = async () => {
    try {
      setPostsDetails(await getDetails());
    } catch (err) {
      console.error(err);
    }
  }

  const onRefresh = () => {
    fetchPosts();
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <CoverImage height={coverImageHeight} />
      <View style={{ flex: 1, borderTopLeftRadius: radius, borderTopRightRadius: radius, backgroundColor: "white", bottom: radius }}>
        <Text text65 style={{ left: 130, top: 10 }}>{userDetails.username}</Text>
        <View style={{ marginLeft: 0, flexDirection: "row", paddingTop: 20, height: 70}}>
          <ProfileInfo count={postsCount} text={"Posts"} />
          <ProfileInfo count={followersCount} text={"Followers"} />
          <ProfileInfo count={followingCount} text={"Following"} />
        </View>
        <PhotoGridView rowPhotos={3} photosURI={mediaURIs} />
      </View>
      <Avatar source={profilePicture} size={profileImageSize} containerStyle={{ position: "absolute", left: radius, top: coverImageHeight - profileImageSize / 2 - radius }} />
    </ScrollView>
  );
};

export default Profile;