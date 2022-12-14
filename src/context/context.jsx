import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    Firestore,
    addDoc,
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

    // get salary users from firebase
    const [salaryUsers, setSalaryUsers] = useState([]);
    const [salaryUsersLoading, setSalaryUsersLoading] = useState(true);

    useEffect(() => {
        try {
            const getSalaryUsers = async () => {
                setSalaryUsersLoading(true);

                const querySnapshot = await getDocs(
                    collection(db, "salaryDetails")
                );
                // don't add the id to the data object
                const data = querySnapshot.docs.map((doc, index) => ({
                    id: doc.id,
                    number: index + 1,
                    ...doc.data(),
                }));
                setSalaryUsers(data);
                setSalaryUsersLoading(false);
            };
            getSalaryUsers();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const storeSalaryDetails = async (data2) => {
        try {
            let docRef = await addDoc(collection(db, "salaryDetails"), data2);
            console.log("Document written with ID: ", docRef.id);
            // delete the user from the users collection
            const querySnapshot = await getDocs(collection(db, "users"));
            const data = querySnapshot.docs.map((doc, index) => ({
                id: doc.id,
                number: index + 1,
                ...doc.data(),
            }));
            const user = data.find(
                (user) =>
                    user.email === data2.email ||
                    user.BVN === data2.BVN ||
                    user.telephone === data2.telephone
            );
            if (user) {
                await deleteDoc(doc(db, "users", user.id));
                // refresh the users and salary users data
                const querySnapshot = await getDocs(collection(db, "users"));
                const data = querySnapshot.docs.map((doc, index) => ({
                    id: doc.id,
                    number: index + 1,
                    ...doc.data(),
                }));
                setData(data);
                const querySnapshot2 = await getDocs(
                    collection(db, "salaryDetails")
                );
                const data2 = querySnapshot2.docs.map((doc, index) => ({
                    id: doc.id,
                    number: index + 1,
                    ...doc.data(),
                }));
                setSalaryUsers(data2);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

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

    //  deleteSalaryUser using the customer id
    const deleteSalaryUser = async (id) => {
        try {
            await deleteDoc(doc(db, "salaryDetails", id));
            // update the data
            const querySnapshot = await getDocs(
                collection(db, "salaryDetails")
            );
            const data = querySnapshot.docs.map((doc, index) => ({
                number: index + 1,
                ...doc.data(),
            }));
            setSalaryUsers(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    //   ***************  hanlde disbursement info  **********************
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState(0);
    const [currentUserAuthCode, setCurrentUserAuthCode] = useState("");
    const handleDisbursement = (currentUserId) => {
        setCustomerId(currentUserId);
        navigate("/admin");
    };

    const [salaryDetails, setSalaryDetails] = useState([]);
    const [currentUserInfo, setCurrentUserInfo] = useState(null);

    const [salaryFullDetails, setSalaryFullDetails] = useState([]);
    const getUserInfo = (info) => {
        setCurrentUserInfo(info);
        setLoading(true);
        var apiKey = "WUNUTUZCMTIzNHxZQ1RNRkI=";
        var apiToken =
            "RmhGRUM3WGVHc0RmNUpKSE5DdDVqQkhpWFVwSzA1WjZNZ1BLNnJZRzhsZz0=";
        var apiHash = CryptoJS.SHA512(apiKey + info.telephone + apiToken);
        var authorization =
            "remitaConsumerKey=" + apiKey + ", remitaConsumerToken=" + apiHash;

        let rand = Math.floor(Math.random() * 1000);
        const raw = {};
        // Adding the object needed for  headed data
        raw.authorisationCode = `YCT-MFB-AC-${info.BVN + rand}`;
        raw.firstName = info.firstName;
        raw.lastName = info.lastName;
        raw.middleName = info.middleName;
        raw.accountNumber = info.accountNumber;
        raw.bankCode = info.bank && info.bank;
        raw.bvn = info.BVN;
        raw.authorisationChannel = "USSD";

        console.log("info", info);
        console.log("handleDisbursement raw", raw);

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
                console.log("data", data);
                setSalaryDetails(data);
                const fullDetails = { ...info, ...data };
                // passing down the current autorization code for disburcement use
                fullDetails.currentUserAuthCode = raw.authorisationCode;
                console.log("full Details", fullDetails);
                setSalaryFullDetails(fullDetails);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
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

    const [isApprovedLoan, setIsApprovedLoan] = useState(false);

    const approvedLoan = () => {
        setIsApprovedLoan(true);
    };

    const rejectLoan = () => {
        setIsApprovedLoan(false);
    };

    //     This is the function call for stop loan button.
    const [approveLoanModal, setApproveLoanModal] = useState(false);
    const [stopLossResult, setStopLossResult] = useState();
    const stopLoss = (loanClient) => {
        setApproveLoanModal(true);
        console.log("loanClient", loanClient);
        setLoading(true);
        var apiKey = "WUNUTUZCMTIzNHxZQ1RNRkI=";
        var apiToken =
            "RmhGRUM3WGVHc0RmNUpKSE5DdDVqQkhpWFVwSzA1WjZNZ1BLNnJZRzhsZz0=";
        var apiHash = CryptoJS.SHA512(apiKey + loanClient.telephone + apiToken);
        var authorization =
            "remitaConsumerKey=" + apiKey + ", remitaConsumerToken=" + apiHash;

        let raw = {
            authorisationCode: loanClient.data.authorisationCode,
            customerId: loanClient.data.customerId,
            mandateRef: loanClient.data.mandateReference,
        };
        let Headers = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                API_KEY: apiKey,
                MERCHANT_ID: 3089960368,
                REQUEST_ID: loanClient.telephone,
                AUTHORIZATION: authorization,
            },
            body: JSON.stringify(raw),
        };

        console.log("Stop Loss Headers", Headers);
        console.log("Stop Loss Raw", raw);

        fetch(
            "https://login.remita.net/remita/exapp/api/v1/send/api/loansvc/data/api/v2/payday/stop/loan",
            Headers
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("Stop loan Response", data);
                setStopLossResult(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    //     This is the function to get the mandate History
    const [mdHistoryResponse, setMdHistoryResponse] = useState();
    const [mdHistoryAction, setMdHistoryAction] = useState(false);
    const mdHistory = (loanClient) => {
        setMdHistoryAction(true);
        console.log("loanClient For Md History", loanClient);
        setLoading(true);
        var apiKey = "WUNUTUZCMTIzNHxZQ1RNRkI=";
        var apiToken =
            "RmhGRUM3WGVHc0RmNUpKSE5DdDVqQkhpWFVwSzA1WjZNZ1BLNnJZRzhsZz0=";
        var apiHash = CryptoJS.SHA512(apiKey + loanClient.telephone + apiToken);
        var authorization =
            "remitaConsumerKey=" + apiKey + ", remitaConsumerToken=" + apiHash;

        let raw = {
            authorisationCode: loanClient.data.authorisationCode,
            customerId: loanClient.data.customerId,
            mandateRef: loanClient.data.mandateReference,
        };
        let Headers = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                API_KEY: apiKey,
                MERCHANT_ID: 3089960368,
                REQUEST_ID: loanClient.telephone,
                AUTHORIZATION: authorization,
            },
            body: JSON.stringify(raw),
        };

        console.log("Mandate History Headers", Headers);
        console.log("Mandate History Raw", raw);

        fetch(
            "https://login.remita.net/remita/exapp/api/v1/send/api/loansvc/data/api/v2/payday/loan/payment/history",
            Headers
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("Mandate History Response", data);

                setMdHistoryResponse(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const value = {
        db,
        salaryDetails,
        getUserInfo,
        currentUserInfo,
        customerId,
        handleDisbursement,
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
        deleteSalaryUser,
        isApprovedLoan,
        approvedLoan,
        rejectLoan,
        salaryFullDetails,
        setSalaryFullDetails,
        salaryUsers,
        storeSalaryDetails,
        salaryUsersLoading,
        stopLoss,
        approveLoanModal,
        setApproveLoanModal,
        stopLossResult,
        setStopLossResult,
        mdHistory,
        mdHistoryAction,
        mdHistoryResponse,
        setMdHistoryAction,
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

export const useApprovedLoan = () => {
    return useContext(Context);
};

export const useStopLoss = () => {
    return useContext(Context);
};

export const useMdHistory = () => {
    return useContext(Context);
};
