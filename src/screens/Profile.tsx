import React from "react";
import { Avatar, Text, View } from "react-native-ui-lib";
import ContentView from "../components/ContentView";
import CoverImage from "../components/CoverImage";
import { useUser } from "../providers/UserProvider";

const noProfilePicture = require("../assets/no-profile-picture.png");

interface ProfileInfoProps {
  count: number;
  text: string
}

const ProfileInfo = ({count, text}: ProfileInfoProps) => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text text60>{count}</Text>
      <Text>{text}</Text>
    </View>
  );
}

const Profile = () => {

  const { userDetails } = useUser();

  const [profilePicture, setProfilePicture] = React.useState(noProfilePicture);

  const [ coverImageHeight ] = React.useState<number>(150);
  const [ profileImageSize ] = React.useState<number>(90);
  const [ followingCount ] = React.useState<number>(userDetails.following.length);
  const [ followersCount ] = React.useState<number>(userDetails.followers.length);
  const [ postsCount ] = React.useState<number>(userDetails.postIDs.length);

  React.useEffect(() => {
  }, []);
  
  return (
    <ContentView>
      <CoverImage height={coverImageHeight} />
      <Avatar source={profilePicture} size={profileImageSize} containerStyle={{position: "absolute", left: 15, top: coverImageHeight - profileImageSize/2}} />
      <Text text65 style={{left: 120, top: 10}}>{userDetails.username}</Text>
      <View style={{height: 60}}>
      <View style={{marginLeft:0, flex: 1, flexDirection: "row", top: 25}}>
        <ProfileInfo count={postsCount} text={"Posts"} />
        <ProfileInfo count={followersCount} text={"Followers"} />
        <ProfileInfo count={followingCount} text={"Following"} />
      </View>
      </View>
    </ContentView>
  );
};

export default Profile;