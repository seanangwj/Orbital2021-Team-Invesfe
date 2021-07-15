import React, { useState, useEffect } from "react";
import {fire} from "../config/Firebase";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
};