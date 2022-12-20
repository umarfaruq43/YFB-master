import React, { useEffect, useState } from "react";
import "../styles/disbursement.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSalaryDetails } from "../context/context";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Skeleton from "../components/Skeleton";

// Date formating function
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

<<<<<<< HEAD
// function formatDate(date) {
//     return (
//         [
//             padTo2Digits(date.getMonth() + 1),
//             padTo2Digits(date.getDate()),
//             date.getFullYear(),
//         ].join("-") +
//         " " +
//         [
//             padTo2Digits(date.getHours()),
//             padTo2Digits(date.getMinutes()),
//             padTo2Digits(date.getSeconds()),
//         ].join(":")
//         // this will give 05-04-2025 05:24:07 (mm/dd/yyyy hh:mm:ss)
//     );
// }
=======
function formatDate(date) {
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
    // this will give 05-04-2025 05:24:07 (mm/dd/yyyy hh:mm:ss)
  );
}
>>>>>>> a2261bbee54abab56a16fc1143d132f0f9b82939

const DisbursementForm = () => {
  const navigate = useNavigate();
  // userInfo from the context
  const { currentUserInfo, customerId, salaryFullDetails, storeSalaryDetails } =
    useSalaryDetails();

  const newData = {
    firstName: currentUserInfo.firstName,
    lastName: currentUserInfo.lastName,
    email: currentUserInfo.email,
    BVN: currentUserInfo.BVN,
    bank: currentUserInfo.bank,
    accountNumber: currentUserInfo.accountNumber,
    loanAmount: currentUserInfo.loanAmount,
    numberOfRepayments: currentUserInfo.numberOfRepayments,
    telephone: currentUserInfo.telephone,
  };

<<<<<<< HEAD
    const initial = {
        phoneNumber: `${currentUserInfo ? currentUserInfo.telephone : ""}`,
        accountNumber: `${
            currentUserInfo ? currentUserInfo.accountNumber : ""
        }`,
        loanAmount: salaryFullDetails && salaryFullDetails.loanAmount,
        collectionAmount: "",
        dateOfDisbursement: "",
        dateOfCollection: "",
        totalCollectionAmount: "",
        startDate: "",
        endDate: "",
        numberOfRepayments:
            salaryFullDetails && salaryFullDetails.numberOfRepayments,
    };

    //     loading  state
    const [loading, setLoading] = useState(false);

    // handle form changes
    const [formData, setFormData] = useState(initial);
    const [approvedData, setApprovedData] = useState("");
=======
  // console.log(newData);

  const initial = {
    phoneNumber: `${currentUserInfo ? currentUserInfo.telephone : ""}`,
    accountNumber: `${currentUserInfo ? currentUserInfo.accountNumber : ""}`,
    loanAmount: salaryFullDetails && salaryFullDetails.loanAmount,
    collectionAmount: "",
    dateOfDisbursement: "",
    dateOfCollection: "",
    totalCollectionAmount: "",
    numberOfRepayments:
      salaryFullDetails && salaryFullDetails.numberOfRepayments,
  };

  // if (currentUserInfo === null) {
  //   navigate("/dashboard");
  // }
  //     loading  state
  const [loading, setLoading] = useState(false);

  // handle Date changes
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // handle form changes
  const [formData, setFormData] = useState(initial);
  const [approvedData, setApprovedData] = useState("");
>>>>>>> a2261bbee54abab56a16fc1143d132f0f9b82939

  //     handle value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

<<<<<<< HEAD
    //     handle when form is submitted
    const handleSubmmit = (e) => {
        // startDate.toISOString();
        formData.dateOfDisbursement = `${startDate}+0000`;

        // // endDate.toISOString();
        formData.dateOfCollection = `${endDate}+0000`;

        e.preventDefault();

        // console.log(formData);

        if (!true) {
        } else {
            setLoading(true);
            var apiKey = "WUNUTUZCMTIzNHxZQ1RNRkI=";
            var apiToken =
                "RmhGRUM3WGVHc0RmNUpKSE5DdDVqQkhpWFVwSzA1WjZNZ1BLNnJZRzhsZz0=";
            var apiHash = CryptoJS.SHA512(
                apiKey + currentUserInfo.telephone + apiToken
            );
            var authorization =
                "remitaConsumerKey=" +
                apiKey +
                ", remitaConsumerToken=" +
                apiHash;
=======
  //     handle when form is submitted
  const handleSubmmit = (e) => {
    formData.dateOfDisbursement = `${formatDate(new Date(startDate))}+0100`;

    // startDate.toISOString();
    formData.dateOfCollection = `${formatDate(new Date(endDate))}+0100`;
    // endDate.toISOString();
    e.preventDefault();

    if (!true) {
    } else {
      setLoading(true);
      var apiKey = "WUNUTUZCMTIzNHxZQ1RNRkI=";
      var apiToken =
        "RmhGRUM3WGVHc0RmNUpKSE5DdDVqQkhpWFVwSzA1WjZNZ1BLNnJZRzhsZz0=";
      var apiHash = CryptoJS.SHA512(
        apiKey + currentUserInfo.telephone + apiToken
      );
      var authorization =
        "remitaConsumerKey=" + apiKey + ", remitaConsumerToken=" + apiHash;
>>>>>>> a2261bbee54abab56a16fc1143d132f0f9b82939

      let rand = Math.floor(Math.random() * 1000);
      // Adding the object needed for  headed data
      formData.authorisationCode = salaryFullDetails.currentUserAuthCode;
      formData.bankCode = `${currentUserInfo.bank && currentUserInfo.bank}`;
      formData.bvn = currentUserInfo.BVN;
      formData.authorisationChannel = "USSD";
      formData.customerId = customerId;
      formData.currency = "NGN";
      let Headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          API_KEY: apiKey,
          MERCHANT_ID: 3089960368,
          REQUEST_ID: currentUserInfo.telephone,
          AUTHORIZATION: authorization,
        },
        body: JSON.stringify(formData),
      };

<<<<<<< HEAD
            console.log("Headers", Headers);
            console.log("handleDisbursement main formData", formData);

            fetch(
                "https://login.remita.net/remita/exapp/api/v1/send/api/loansvc/data/api/v2/payday/post/loan",
                Headers
            )
                .then((res) => res.json())
                .then((data) => {
                    setApprovedData({ ...data, ...formData, ...newData });
                    setLoading(false);
                });
        }
    };
=======
      // console.log("Headers", Headers);
      // console.log("formData", formData);

      fetch(
        "https://login.remita.net/remita/exapp/api/v1/send/api/loansvc/data/api/v2/payday/post/loan",
        Headers
      )
        .then((res) => res.json())
        .then((data) => {
          setApprovedData({ ...data, ...formData, ...newData });
          setLoading(false);
          // if (data && data.status === "success") {
          //   navigate("/dashboard");
          // }
        });
    }
  };
>>>>>>> a2261bbee54abab56a16fc1143d132f0f9b82939

  // store the approved data into the storeSalaryDetails
  useEffect(() => {
    if (approvedData) {
      storeSalaryDetails(approvedData);
      navigate("/dashboard");
      // then reload the page
    }
  }, [approvedData, formData]);

<<<<<<< HEAD
    const {
        phoneNumber,
        accountNumber,
        loanAmount,
        collectionAmount,
        dateOfDisbursement,
        dateOfCollection,
        totalCollectionAmount,
        numberOfRepayments,
        startDate,
        endDate,
    } = formData;
=======
  const {
    phoneNumber,
    accountNumber,
    loanAmount,
    collectionAmount,
    dateOfDisbursement,
    dateOfCollection,
    totalCollectionAmount,
    numberOfRepayments,
  } = formData;
>>>>>>> a2261bbee54abab56a16fc1143d132f0f9b82939

  return (
    <div className="disbursement">
      {loading ? (
        <Skeleton type="custom" />
      ) : (
        <div className="content">
          <form action="" onSubmit={handleSubmmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="p_no">Phone Number</label>
                <input
                  value={phoneNumber}
                  className="form-control"
                  type="number"
                  id="p_no"
                  name="phoneNumber"
                  onChange={handleChange}
                  disabled={true}
                />
              </div>

              <div className="col">
                <label htmlFor="acc_no">Account Number</label>
                <input
                  value={accountNumber}
                  className="form-control"
                  type="number"
                  id="acc_no"
                  name="accountNumber"
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
              <div className="col">
                <label htmlFor="loanAmount"> Loan Amount</label>
                <input
                  value={loanAmount}
                  className="form-control"
                  type="number"
                  id="loanAmount"
                  name="loanAmount"
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label htmlFor="collectionAmount"> Collection Amount</label>
                <input
                  value={collectionAmount}
                  className="form-control"
                  type="number"
                  id="collectionAmount"
                  name="collectionAmount"
                  onChange={handleChange}
                  required
                />
              </div>

<<<<<<< HEAD
                            <div className="col">
                                <label htmlFor="loanAmount">
                                    {" "}
                                    Date Of Disbursement
                                </label>
                                <div>
                                    <input
                                        value={startDate}
                                        type="text"
                                        placeholder="dd-mm-yyyy hh:mm:ss"
                                        name="startDate"
                                        id="startDate"
                                        onChange={handleChange}
                                    />
                                    {/* <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        required
                                    /> */}
                                </div>
                            </div>
                            <div className="col">
                                <label htmlFor="loanAmount">
                                    {" "}
                                    Date Of Collection
                                </label>
                                <div>
                                    <input
                                        value={endDate}
                                        placeholder="dd-mm-yyyy hh:mm:ss"
                                        type="text"
                                        name="endDate"
                                        id="endDate"
                                        onChange={handleChange}
                                    />

                                    {/* <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        required
                                    /> */}
                                </div>
                            </div>

                            <div className="col">
                                <label htmlFor="loanAmount">
                                    {" "}
                                    Total Collection Amount
                                </label>
                                <input
                                    value={totalCollectionAmount}
                                    className="form-control"
                                    type="number"
                                    id="totalCollectionAmount"
                                    name="totalCollectionAmount"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col">
                                <label htmlFor="loanAmount">
                                    {" "}
                                    Number Of Repayments
                                </label>
                                <input
                                    value={numberOfRepayments}
                                    className="form-control"
                                    type="number"
                                    id="numberOfRepayments"
                                    name="numberOfRepayments"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="disburseButton">
                            <button className="approve" type="submit">
                                Approve
                            </button>

                            <button
                                className="back"
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>
                        </div>
                    </form>
=======
              <div className="col">
                <label htmlFor="loanAmount"> Date Of Disbursement</label>
                <div>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                  />
>>>>>>> a2261bbee54abab56a16fc1143d132f0f9b82939
                </div>
              </div>
              <div className="col">
                <label htmlFor="loanAmount"> Date Of Collection</label>
                <div>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    required
                  />
                </div>
              </div>

              <div className="col">
                <label htmlFor="loanAmount"> Total Collection Amount</label>
                <input
                  value={totalCollectionAmount}
                  className="form-control"
                  type="number"
                  id="totalCollectionAmount"
                  name="totalCollectionAmount"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col">
                <label htmlFor="loanAmount"> Number Of Repayments</label>

                <input
                  value={numberOfRepayments}
                  className="form-control"
                  type="number"
                  id="numberOfRepayments"
                  name="numberOfRepayments"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="disburseButton">
              <button className="approve" type="submit">
                Approve
              </button>

              <button
                className="back"
                type="button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DisbursementForm;
