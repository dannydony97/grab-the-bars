import React from "react";
import app from "../../realmApp";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {

  React.useEffect(() => {
    console.log(app);
  });

  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  );

};

export { AuthContext, AuthProvider };