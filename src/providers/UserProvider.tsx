import React from "react";
import { deleteMedia, downloadMedia, getCollection, uploadMedia, USERS_COLLECTION_NAME } from "../app-exports";
import User, { UserDetails } from "../schemas/User";
import { useAuth } from "./AuthProvider";

const UserContext = React.createContext(null);

interface UserProviderProps {
  children: JSX.Element | JSX.Element[],
  userID?: Realm.BSON.ObjectId
}

const UserProvider = ({ children, userID }: UserProviderProps) => {

  // Current logged in user informations
  const { user, username, getDatabase } = useAuth();

  const [currentUserID, setCurrentUserID] = React.useState<Realm.BSON.ObjectId | undefined>(userID);
  const [userDetails, setUserDetails] = React.useState<UserDetails | undefined>();

  React.useEffect(() => {
    // If an ID hasn't been provided, use the logged in user as current user
    if(userID === undefined) {
      setCurrentUserID(new Realm.BSON.ObjectId(user.id));
    }
  }, [userID]);

  React.useEffect(() => {

    if(currentUserID === undefined)
      return;

    const asyncEffect = async () => {
      if(! await User.exists(currentUserID)) {
        await User.add(currentUserID, username);
      }

      setUserDetails(await User.get(currentUserID));
    };
    asyncEffect();
  }, [currentUserID]);

  const pushPost = async (id: Realm.BSON.ObjectId) => {

    const collection = await getCollection(USERS_COLLECTION_NAME);
    if(collection === undefined)
      throw new Error("Collection is undefined");

    const userDocument = await collection.findOne({ userID: currentUserID });
    if (userDocument === undefined)
      throw new Error("User could not be found!");

    const res = await collection.updateOne({ userID: currentUserID }, { $push: { postIDs: id } });

    console.log("Post ID succesfully pushed to user!", res);
  }

  const setCoverImage = async (imageURI: string): Promise<string> => {
    const collection = await getCollection(USERS_COLLECTION_NAME);
    if(collection === undefined) {
      throw new Error("Collection is undefined");
    }

    const userDocument = await collection.findOne({ userID: currentUserID });
    if (userDocument === undefined) {
      throw new Error("User could not be found!");
    }

    const { coverImageKey } = userDetails;
    if(coverImageKey !== null) {
      deleteMedia([coverImageKey]);
    }
    
    const [ key ] = await uploadMedia([imageURI]);
    const res = await collection.updateOne({ userID: currentUserID }, { $set: { coverImageKey: key } });

    console.log("Im'm hereeee", res.matchedCount);
    if(res.matchedCount !== 1 || res.modifiedCount !== 1) {
      throw new Error("User collection could not be updated!");
    }

    setUserDetails(await User.get(currentUserID));

    console.log("Cover image key succesfully setted to user!", res);
    return key;
  }

  const getCoverImage = async (): Promise<string> => {

    const { coverImageKey } = userDetails;
    const [ coverImageURI ] = await downloadMedia([coverImageKey]);

    return coverImageURI;
  }

  return (
    <UserContext.Provider
      value={{ pushPost, setCoverImage, getCoverImage, userDetails }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  const user = React.useContext(UserContext);
  if (user === null)
    throw new Error("useUser() called outside UserProvider?");

  return user;
}

export { UserProvider, useUser };