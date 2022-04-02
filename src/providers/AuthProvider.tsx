import React from "react";
import Realm, { BSON } from "realm";
import app from "../../realmApp";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {

  const [user, setUser] = React.useState(app.currentUser);
  const [username, setUsername] = React.useState<string>(undefined);

  const signIn = async (email: string, password: string) => {

    const credentials = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(credentials);
    setUser(newUser);

    if(username === undefined) {
      return;
    }
    
    const mongo = newUser.mongoClient("mongodb-atlas");
    const db = mongo.db("grab_the_bars");
    const collection = db.collection("users");
    
    await collection.insertOne({
      "userID": newUser.id,
      "username": username,
      "description": "",
    });
  };

  const registerUser = async (username: string, email: string, password: string) => {

    await app.emailPasswordAuth.registerUser({email, password});
    console.log("User registration succedded!");
    setUsername(username);
  };

  return (
    <AuthContext.Provider
      value={{ registerUser, signIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );

};

const useAuth = () => {
  const auth = React.useContext(AuthContext);
  if(auth == null)
    throw new Error("useAuth() called outside AuthProvider?");

  return auth;
}

export { AuthProvider, useAuth };