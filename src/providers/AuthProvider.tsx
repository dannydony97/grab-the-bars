import React from "react";
import Realm from "realm";
import app from "../../realmApp";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {

  const [user, setUser] = React.useState(app.currentUser);

  const signIn = async (email: string, password: string) => {
    const credentials = Realm.Credentials.emailPassword(email, password);

    try {
      const newUser = await app.logIn(credentials);
      setUser(newUser);
    } catch(err) {
      console.error(err);
    }

    //console.log(app, newUser.accessToken);
  };

  const registerUser = async (email: string, password: string) => {

    try {
      const res = await app.emailPasswordAuth.registerUser({email, password});
      console.log("User registration succedded!", res);
    } catch(err) {
      console.error(err);
    }
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