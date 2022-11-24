import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import close from "../assets/close-icon.svg";
import successIcon from "../assets/success-icon.svg";
import Skeleton from "../components/Skeleton";
import UserFormInput from "../components/UserFormInput";
import { Error } from "@mui/icons-material";
import { bank_codes } from "../bankCodes";

const Home = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    telephone: "",
    email: "",
    authCode: "",
    accountNumber: "",
    bankCode: "",
    BVN: "",
    AuthChannel: "",
    terms: false,
  });
  const [optionSelect, setOptionSelect] = useState(false);

  console.log(optionSelect);

  const inputs = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      errorMessage: "First name should be 3 or more characters.",
      name: "firstName",
      required: true,
      pattern: "[a-zA-Z]{3,}",
    },

    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      errorMessage: "Last name should be 3 or more characters.",
      name: "lastName",
      required: true,
      pattern: "[a-zA-Z]{3,}",
    },

    {
      id: "middleName",
      label: "Middle Name",
      type: "text",
      placeholder: "Enter your middle name",
      errorMessage: "Middle name should be 3 or more char.",
      name: "middleName",
      required: true,
      pattern: "[a-zA-Z]{3,}",
    },

    {
      id: "telephone",
      label: "Telephone",
      type: "tel",
      placeholder: "Enter your telephone number",
      errorMessage: "telephone number should be 11 digits",
      name: "telephone",
      required: true,
      pattern: "[0-9]{11}",
    },

    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email address",
      errorMessage: "email address should be valid",
      name: "email",
      required: true,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
    },

    // {
    //   id: "authCode",
    //   label: "Auth Code",
    //   type: "text",
    //   placeholder: "Enter your auth code",
    //   errorMessage: "auth code should be 6 digits",
    //   name: "authCode",
    //   required: true,
    //   pattern: "[0-9]{6}",
    // },

    {
      id: "accountNumber",
      label: "Account Number",
      type: "text",
      placeholder: "Enter your account number",
      errorMessage: "account number should be 10 digits",
      name: "accountNumber",
      required: true,
      pattern: "[0-9]{10}",
    },

    // {
    //   id: "bankCode",
    //   label: "Bank Code",
    //   type: "text",
    //   placeholder: "Enter your bank code",
    //   errorMessage: "bank code should be 3 digits",
    //   name: "bankCode",
    //   required: true,
    //   pattern: "[0-9]{3}",
    // },

    {
      id: "BVN",
      label: "BVN",
      type: "text",
      placeholder: "Enter your BVN",
      errorMessage: "BVN should be 11 digits",
      name: "BVN",
      required: true,
      pattern: "[0-9]{11}",
    },

    // {
    //   id: "AuthChannel",
    //   label: "Auth Channel",
    //   type: "text",
    //   placeholder: "Enter your auth channel",
    //   errorMessage: "auth channel should be 1 digit",
    //   name: "AuthChannel",
    //   required: true,
    //   pattern: "[0-9]{1}",
    // },

    {
      id: "terms",
      label: `Filling in your details, means you agree to provide your data and you’re with our Terms & Privacy Policy`,
      type: "checkbox",
      placeholder: "Enter your terms",
      errorMessage: "terms should be checked",
      name: "terms",
      className: "terms",
      required: true,
    },
  ];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    setLoading(true);

    getDocs(collection(db, "users")).then((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      const userExists = users.some(
        (user) =>
          user.email === values.email ||
          user.telephone === values.telephone ||
          user.BVN === values.BVN
      );
      if (userExists) {
        setMessage("User already exists");
        setLoading(false);
      } else {
        addDoc(collection(db, "users"), values, { merge: true })
          .then(() => {
            setMessage("User added successfully");
            setSubmitted(true);
            setLoading(false);
          })
          .catch((error) => {
            setMessage(error.message);
            setLoading(false);
          });
      }
    });

    setValues({
      firstName: "",
      lastName: "",
      middleName: "",
      telephone: "",
      email: "",
      authCode: "",
      accountNumber: "",
      bankCode: "",
      // BVN: "",
      // AuthChannel: "",
      terms: false,
    });
  };

  const closePopup = () => {
    setMessage(null);
  };

  return (
    <>
      {loading ? (
        <Skeleton type="circle" />
      ) : (
        <>
          <Header />
          <StyledHome>
            <div className="left">
              <div className="left-content">
                <h1>Get more loan with us at ease!</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when a
                </p>
                <button>Read more</button>
              </div>
            </div>
            <div className="right">
              <div className="right-content">
                <h2>Enter your details</h2>
                <form
                  method="POST"
                  onSubmit={handleSubmit}
                  style={{
                    position: "relative",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    gap: "12px",
                  }}
                >
                  {inputs.map((input) => (
                    <UserFormInput
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      className="terms"
                      onChange={
                        input.type === "checkbox"
                          ? handleCheckboxChange
                          : handleChange
                      }
                      loading={loading}
                    />
                  ))}
                  {/* Add select option */}
                  <div
                    className="select"
                    style={{
                      width: "100%",
                      // move the order to the top
                      order: "-1",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none",
                        color: "#757575",
                      }}
                      name="bank"
                      required
                      value={
                        bank_codes.find((bank) => bank.code === values.bankCode)
                          ?.name
                      }
                      onChange={handleChange}
                    >
                      <option value="">Select your bank</option>
                      {
                        // map through bank codes
                        bank_codes.map((bank) => (
                          <option key={bank.bankCode} value={bank.bankCode}>
                            {bank.bankName}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <button type="submit" disabled={!values.terms}>
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Create a popup */}
            {message && (
              <div className="popup-container">
                <div className="popup">
                  <div className="close-popup">
                    <button onClick={closePopup}>
                      <img src={close} alt="close" />
                    </button>

                    <div className="popup-content">
                      {/* {<img src={successIcon} alt="success" /> */}
                      {message === "User added successfully" ? (
                        <img src={successIcon} alt="success" />
                      ) : (
                        <Error
                          style={{
                            color: "red",
                            fontSize: "3rem",
                            marginBottom: "1rem",
                          }}
                        />
                      )}
                      <h2>{message}</h2>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </StyledHome>
        </>
      )}
    </>
  );
};

export default Home;

const StyledHome = styled.section`
  background-color: #eee;
  height: 100vh;
  margin-top: -57px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      "left"
      "right";
  }

  .left {
    grid-area: left;
    background-color: #34a853;

    .left-content {
      height: 100%;
      max-width: 590px;
      margin: 0 auto;
      margin-right: 0;
      display: flex;
      justify-content: center;
      padding: 10px;
      padding-right: 100px;
      flex-direction: column;
      gap: 20px;

      @media (max-width: 1024px) {
        padding-right: 10px;
      }

      @media (max-width: 768px) {
        padding-right: 10px;
        max-width: max-content;
        padding-top: 100px;
        padding-bottom: 50px;
      }

      h1 {
        font-family: "Montserrat Alternates";
        font-style: normal;
        font-weight: 700;
        font-size: 60px;
        line-height: 60px;
        color: #fdc800;

        @media (max-width: 425px) {
          font-size: 55px;
        }
      }

      p {
        font-weight: 300;
        font-size: 14px;
        line-height: 24px;
        color: #ffffff;
      }

      button {
        background: #fff;
        border-radius: 5px;
        padding: 10px 20px;
        font-weight: 600;
        font-size: 14px;
        color: #344054;
        line-height: 17px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        max-width: max-content;

        @media (max-width: 768px) {
          max-width: 100%;
        }
        &:hover {
          background: #fcbf00;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }

  .right {
    grid-area: right;
    background-color: #fff;

    .right-content {
      height: 100%;
      max-width: 590px;
      margin: 0 auto;
      margin-left: 0;
      display: flex;
      justify-content: center;
      padding: 10px;
      padding-left: 100px;
      flex-direction: column;
      gap: 20px;

      @media (max-width: 1024px) {
        padding-left: 10px;
      }

      @media (max-width: 768px) {
        padding-left: 10px;
        max-width: max-content;
        padding-top: 50px;
        padding-bottom: 50px;
      }

      h2 {
        font-family: "Montserrat Alternates";
        font-weight: 600;
        font-size: 36px;
        line-height: 44px;
        color: #fbbc05;
      }

      form {
        display: flex;
        flex-direction: column;
        width: 100%;

        @media (max-width: 425px) {
          display: flex;
          flex-direction: column;
        }

        button {
          grid-column: 1 / 3;
          background: #fbbc05;
          border-radius: 5px;
          padding: 10px 20px;
        }

        button {
          background: #344054;
          border-radius: 6.25px;
          padding: 10px 20px;
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
          line-height: 17px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          width: 100%;
          border: none;

          &:hover {
            background: #fcbf00;
            outline: none;
          }

          &:disabled {
            background: #667085;
            filter: brightness(0.9);
            cursor: not-allowed;
          }
        }
      }
    }
  }

  .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .popup {
      background-color: #fff;
      border-radius: 24px;
      padding: 50px 64px;
      width: 400px;
      max-width: 100%;
      display: flex;
      position: relative;

      @media (max-width: 425px) {
        width: 300px;
        max-width: 100%;
        padding: 20px;
      }

      * {
        text-align: center;
      }

      h2 {
        font-family: "Montserrat Alternates";
        font-weight: 600;
        font-size: 36px;
        line-height: 44px;
        text-align: center;
      }

      button {
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        font-size: 24px;
        color: #fbbc05;
        position: absolute;
        top: 10px;
        right: 10px;

        &:hover {
          color: #fcbf00;
        }
      }

      .popup-content {
        img {
          width: 64px;
        }
      }
    }
  }
`;
