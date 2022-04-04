import React from "react";
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

  const [currentUserID, setCurrentUserID] = React.useState(userID);

  React.useEffect(() => {
    // If an ID hasn't been provided, use the logged in user as current user
    if(userID === undefined) {
      setCurrentUserID(user.id);
    }
  }, [userID]);

  React.useEffect(() => {

    if(currentUserID === undefined)
      return;

    // If current user wasn't registered before
    const register = async () => {

      const collection = await getCollection();
      if(collection === undefined)
        return;

      const userDocument = await collection.findOne({ "userID": currentUserID });
      if(userDocument === null) {

        // Need extra information from AuthentificationProvider
        // Init user collection with a new user details
        await collection.insertOne({
          "userID": currentUserID,
          "username": username,
          "description": "",
          "postsIDs": []
        });
      }
    }

    register();
  }, [currentUserID]);

  const getCollection = async () => {
    const db = await getDatabase();
    const collection = db.collection("users");
    if (collection === undefined)
      throw new Error("User collection could not be retreaved!");

    return collection;
  }

  const getDetails = async (): Promise<UserDetails> => {

    const collection = await getCollection();
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

    const collection = await getCollection();
    if(collection === undefined)
      throw new Error("Collection is undefined");

    const userDocument = await collection.findOne({ "userID": currentUserID });
    if (userDocument === undefined)
      throw new Error("User could not be found!");

    const res = await collection.updateOne({ "userID": currentUserID }, { $push: { postsIDs: id } });

    console.log("Post ID succesfully pushed yo user!", res);
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