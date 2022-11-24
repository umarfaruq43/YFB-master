import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Context = createContext();

export default function ContextProvider({ children }) {
  const [data, setData] = useState([]);

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    try {
      const getData = async () => {
        setDataLoading(true);
        // add the id to the data object as well
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          number: index + 1,
          ...doc.data(),
        }));
        setData(data);
        setDataLoading(false);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  // sign up
  const handleSignup = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // sign in
  const handleSignIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // logout
  const signOut = async () => {
    await signOut(auth);
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      // update the data
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        number: index + 1,
        ...doc.data(),
      }));
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Generate access token
  const [tokenLoading, setTokenLoading] = useState(false);
  const [expiresIn, setExpiresIn] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const URL =
    "https://remitademo.net/remita/exapp/api/v1/send/api/uaasvc/uaa/token";
  const username = "UHSU6ZIMAVXNZHXW";
  const password = "K8JE73OFE508GMOW9VWLX5SLH5QG1PF2";
  const [tokenError, setTokenError] = useState("");

  const generateAccessToken = async () => {
    // post request to generate access token
    setTokenLoading(true);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const dataToken = await response.json();
      setExpiresIn(dataToken["data"][0]["expiresIn"]);
      setAccessToken(dataToken["data"][0]["accessToken"]);
      setTokenLoading(false);
    } catch (error) {
      setTokenError(error.message);
      setTokenLoading(false);
      setTimeout(() => {
        setTokenError("");
      }, 3000);
    }
  };

  const value = {
    db,
    data,
    dataLoading,
    auth,
    user,
    loading,
    error,
    handleSignup,
    handleSignIn,
    signOut,
    tokenLoading,
    tokenError,
    generateAccessToken,
    expiresIn,
    accessToken,
    deleteUser,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// export data from context

export const dbContext = () => {
  return useContext(Context);
};

export const useAuth = () => {
  return useContext(Context);
};

export const useToken = () => {
  return useContext(Context);
};

export const useDelete = () => {
  return useContext(Context);
};
