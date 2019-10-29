import React, { useEffect, useState } from "react";
import firebase from "firebase/app";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  function signOut() {
    return firebase.auth().signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
