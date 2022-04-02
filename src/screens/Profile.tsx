import React from "react";
import { Avatar } from "react-native-ui-lib";
import ContentView from "../components/ContentView";

const noProfilePicture = require("../assets/no-profile-picture.png");

const Profile = () => {

  const [profilePicture, setProfilePicture] = React.useState(noProfilePicture);

  React.useEffect(() => {
  }, []);

  return (
    <ContentView>
      <Avatar source={profilePicture}/>
    </ContentView>
  );
};

export default Profile;