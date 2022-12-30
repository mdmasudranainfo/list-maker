import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/Firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext({});

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoader] = useState(false);
  // register
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update
  const update = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL:
        "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
    });
  };

  // login with
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logOut
  const logOut = () => {
    return signOut(auth);
  };

  // track user profile
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (CurrntUser) => {
      setUser(CurrntUser);
      setLoader(true);
    });
    return () => unSubscribe();
  }, []);

  // context info
  const userInfo = { register, update, login, user, loader: loading, logOut };
  return (
    <div>
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default UserContext;
