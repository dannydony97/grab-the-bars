import React from "react";
import { Avatar } from "react-native-ui-lib";
import ContentView from "../components/ContentView";
import CoverImage from "../components/CoverImage";

const noProfilePicture = require("../assets/no-profile-picture.png");

const Profile = () => {

  const [profilePicture, setProfilePicture] = React.useState(noProfilePicture);

  const [ coverImageHeight ] = React.useState<number>(150);
  const [ profileImageSize ] = React.useState<number>(90);

  React.useEffect(() => {
  }, []);

  return (
    <ContentView>
      <CoverImage height={coverImageHeight} />
      <Avatar source={profilePicture} size={profileImageSize} containerStyle={{position: "absolute", left: 15, top: coverImageHeight - profileImageSize/2}} />
    </ContentView>
  );
};

export default Profile;