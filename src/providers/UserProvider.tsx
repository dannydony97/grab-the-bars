import React from "react";
import { getCollection, USERS_COLLECTION_NAME } from "../app-exports";
import User from "../schemas/User";
import { useAuth } from "./AuthProvider";

const UserContext = React.createContext(null);

interface UserDetails {
  username: string,
  profileImage?: string
}

interface UserProviderProps {
  children: JSX.Element | JSX.Element[],
  userID?: Realm.BSON.ObjectId
}

const UserProvider = ({ children, userID }: UserProviderProps) => {

  // Current logged in user informations
  const { user, username, getDatabase } = useAuth();

  const [currentUserID, setCurrentUserID] = React.useState<Realm.BSON.ObjectId | undefined>(userID);

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
        await User.add(new Realm.BSON.ObjectId(currentUserID), username);
      }
    };
    asyncEffect();
  }, [currentUserID]);

  const getDetails = async (): Promise<UserDetails> => {

    const collection = await getCollection(USERS_COLLECTION_NAME);
    if(collection === undefined)
      throw new Error("Collection is undefined");

    const userDocument = await collection.findOne({ "userID": currentUserID });
    if (userDocument === undefined)
      throw new Error("User could not be found!");

    return {
      username: userDocument.username,
      profileImage: undefined // Must DO!
    }
  }

  const pushPost = async (id) => {

    const collection = await getCollection(USERS_COLLECTION_NAME);
    if(collection === undefined)
      throw new Error("Collection is undefined");

    const userDocument = await collection.findOne({ "userID": currentUserID });
    if (userDocument === undefined)
      throw new Error("User could not be found!");

    const res = await collection.updateOne({ "userID": currentUserID }, { $push: { postIDs: id } });

    console.log("Post ID succesfully pushed to user!", res);
  }

  return (
    <UserContext.Provider
      value={{ getDetails, pushPost }}
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