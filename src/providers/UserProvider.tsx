import React from "react";
import { useAuth } from "./AuthProvider";

const UserContext = React.createContext(null);

interface UserDetails {
  username: string,
  profileImage?: string
}

/**
 * Current logged in user provider
 */
const UserProvider = ({ children }) => {

  const { user, username, getDatabase } = useAuth();

  const [collection, setCollection] = React.useState(undefined);

  React.useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const db = await getDatabase();
    const collection = await db.collection("users");

    if (collection === undefined)
      throw new Error("User collection could not be retreaved!");

    setCollection(collection);

    const userDocument = await collection.findOne({ "userID": user.id });
    if(userDocument === null) {
        // Init user collection with a new user details
        await collection.insertOne({
          "userID": user.id,
          "username": username,
          "description": "",
          "postsIDs": []
        });
    }
  }

  const getDetails = async (): Promise<UserDetails> => {

    const userDocument = await collection.findOne({ "userID": user.id });
    if (userDocument === undefined)
      throw new Error("User could not be found!");

    return {
      username: userDocument.username,
      profileImage: undefined // Must DO!
    }
  }

  const pushPost = async (id) => {

    const userDocument = await collection.findOne({ "userID": user.id });
    if (userDocument === undefined)
      throw new Error("User could not be found!");

    const res = await collection.updateOne({ "userID": user.id }, { $push: { postsIDs: id } });

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