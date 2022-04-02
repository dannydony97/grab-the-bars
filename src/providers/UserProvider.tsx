import React from "react";
import { useAuth } from "./AuthProvider";

const UserContext = React.createContext(null);

const UserProvider = ({children}) => {

  const { user } = useAuth();

  const [document, setDocument] = React.useState(undefined);

  React.useEffect(() => {
    const mongo = user.mongoClient("mongodb-atlas");
    const db = mongo.db("grab_the_bars");
    const collection = db.collection("users");

    collection.findOne({"userID": user.id})
    .then((doc) => {
      setDocument(doc);
    })
    .catch((err) => {
      console.error("Failed getting document for current user", err);
    });
  }, []);

  const username = () => {
    return document.username;
  };

  const profileImage = () => {
    return null;
  }

  return (
    <UserContext.Provider
      value={username, profileImage}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  const user = React.useContext(UserContext);
  if(user === null)
    throw new Error("useUser() called outside AuthProvider?");
  
  return user;
}

export { UserProvider, useUser };