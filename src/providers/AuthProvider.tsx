import React from "react";
import Realm from "realm";
import app from "../../realmApp";
import { DATABASE_NAME, SERVICE_NAME } from "../app-exports";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {

  const [user, setUser] = React.useState(app.currentUser);

  const [username, setUsername] = React.useState<string>("");

  const signIn = async (email: string, password: string) => {

    const credentials = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(credentials);
    setUser(newUser);
  };

  const registerUser = async (username: string, email: string, password: string) => {

    await app.emailPasswordAuth.registerUser({email, password});
    console.log("User registration succedded!");

    // Extra informations
    setUsername(username);
  };

  const getDatabase = async () => {
    const mongo = user.mongoClient(SERVICE_NAME);
    const db = mongo.db(DATABASE_NAME);

    return db;
  }

  return (
    <AuthContext.Provider
      value={{ registerUser, signIn, getDatabase, user, username }}
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