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
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

export default function ContextProvider({ children }) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

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
    //   ***************  hanlde disbursement info  **********************
    const [customerId, setCustomerId] = useState(0);
    const [currentUserAuthCode, setCurrentUserAuthCode] = useState("");
    const handleDisbursement = (currentUserId) => {
        setCustomerId(currentUserId);
        console.log(currentUserInfo);
        navigate("/admin");
    };
    //   ***************  get user info  **********************
    const [salaryDetails, setSalaryDetails] = useState([]);
    const [currentUserInfo, setCurrentUserInfo] = useState(null);

    const getUserInfo = (info) => {
        // storing this in a state to pass down the customer id to the disbursement page
        setCurrentUserInfo(info);
        console.log(info);
        setLoading(true);
        var apiKey = "WUNUTUZCMTIzNHxZQ1RNRkI=";
        var apiToken =
            "RmhGRUM3WGVHc0RmNUpKSE5DdDVqQkhpWFVwSzA1WjZNZ1BLNnJZRzhsZz0=";
        var apiHash = CryptoJS.SHA512(apiKey + info.telephone + apiToken);
        var authorization =
            "remitaConsumerKey=" + apiKey + ", remitaConsumerToken=" + apiHash;

        let rand = Math.floor(Math.random() * 1000);
        const userAuthoCode = `YCT-MFB-AC-${info.BVN + rand}`;

        // for passing the unique token down to the disbursement page
        setCurrentUserAuthCode(userAuthoCode);
        const raw = {};
        // Adding the object needed for  headed data
        raw.authorisationCode = userAuthoCode;
        raw.firstName = info.firstName;
        raw.lastName = info.lastName;
        raw.middleName = info.middleName;
        raw.accountNumber = info.accountNumber;
        raw.bankCode = info.bank;
        raw.bvn = info.BVN;
        raw.authorisationChannel = "USSD";

        let Headers = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                API_KEY: apiKey,
                MERCHANT_ID: 3089960368,
                REQUEST_ID: info.telephone,
                AUTHORIZATION: authorization,
            },
            body: JSON.stringify(raw),
        };
        fetch(
            "https://login.remita.net/remita/exapp/api/v1/send/api/loansvc/data/api/v2/payday/salary/history/provideCustomerDetails",
            Headers
        )
            .then((res) => res.json())
            .then((data) => {
                setSalaryDetails(data);
                setLoading(false);
            });
    };

    // Generate access token
    const [tokenLoading, setTokenLoading] = useState(false);
    const [expiresIn, setExpiresIn] = useState(0);
    const [accessToken, setAccessToken] = useState("");
    const URL =
        "https://login.remita.net/remita/exapp/api/v1/send/api/uaasvc/uaa/token";
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
        handleDisbursement,
        currentUserInfo,
        currentUserAuthCode,
        customerId,
        salaryDetails,
        getUserInfo,
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
export const useLoading = () => {
    return useContext(Context);
};

export const useSalaryDetails = () => {
    return useContext(Context);
};
