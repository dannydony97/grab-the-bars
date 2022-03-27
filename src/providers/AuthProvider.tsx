import React from "react";
import Realm from "realm";
import app from "../../realmApp";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {

  const [user, setUser] = React.useState(app.currentUser);

  const signIn = async (email: string, password: string) => {

    const credentials = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(credentials);
    setUser(newUser);

  };

  const registerUser = async (username: string, email: string, password: string) => {

    await app.emailPasswordAuth.registerUser({email, password});
    console.log("User registration succedded!");
      
    const currentUser = app.currentUser;
    currentUser.profile.name = username;
  };

  return (
    <AuthContext.Provider
      value={{ registerUser, signIn }}
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