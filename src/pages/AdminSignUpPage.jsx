import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/yfb-logo-dark.png";
import FormInput from "../components/FormInput";
import Skeleton from "../components/Skeleton";
import { useAuth } from "../context/context";
import { Close } from "@mui/icons-material";
import { signOut } from "firebase/auth";

const AdminSignUpPage = () => {
  const [switched, setSwitched] = useState(true);

  // Form Button Switched
  const handleSwitch = () => {
    setSwitched(!switched);
  };

  // Form Input
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const signUpInputs = [
    {
      id: "email",
      label: "Email",
      type: "email",
      value: signupData.email,
      onChange: (e) => setSignupData({ ...signupData, email: e.target.value }),
      name: "email",
      placeholder: "Enter your email",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      required: true,
      errorMessage: "Please enter a valid email",
    },

    {
      id: "password",
      label: "Password",
      type: "password",
      value: signupData.password,
      onChange: (e) =>
        setSignupData({ ...signupData, password: e.target.value }),
      name: "password",
      placeholder: "Enter your password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
      required: true,
      errorMessage: "Please enter a valid password",
    },

    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      value: signupData.confirmPassword,
      onChange: (e) =>
        setSignupData({ ...signupData, confirmPassword: e.target.value }),
      name: "confirmPassword",
      placeholder: "Confirm your password",
      pattern: signupData.password,
      required: true,
      errorMessage: "Passwords do not match!",
    },
  ];

  const loginInputs = [
    {
      id: "email",
      label: "Email",
      type: "email",
      value: loginData.email,
      onChange: (e) => setLoginData({ ...loginData, email: e.target.value }),
      name: "email",
      placeholder: "Enter your email",
      required: true,
      errorMessage: "Please enter a valid email",
    },

    {
      id: "password",
      label: "Password",
      type: "password",
      value: loginData.password,
      onChange: (e) => setLoginData({ ...loginData, password: e.target.value }),
      name: "password",
      placeholder: "Enter your password",
      required: true,
      errorMessage: "Please enter a valid password",
    },
  ];

  // Button for form switch
  let className = switched ? "btn btn-primary" : "btn btn-secondary";

  const { loading, error, handleSignup, handleSignIn, auth, user } = useAuth();

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (switched) {
      handleSignup(signupData.email, signupData.password);
    } else {
      handleSignIn(loginData.email, loginData.password);
    }

    // reset form
    setSignupData({
      email: "",
      password: "",
      confirmPassword: "",
    });

    setLoginData({
      email: "",
      password: "",
    });
  };

  // Loader
  if (loading)
    return (
      <>
        <Skeleton type="custom" />
      </>
    );

  // authorised user
  const admins = [
    "noibiabdulrasaq@gmail.com",
    "suleimansuleiman606@gmail.com",
    "monsurrajiybs@gmail.com",
    "hakeemlekspy@gmail.com",
    "enibecks30@gmail.com",
    "salamiabibatabiola82@gmail.com",
    "hassansharafadeen84@gmail.com",
  ];

  // Redirect to dashboard if user is authorised
  if (user && admins.includes(user.email)) return <Navigate to="/dashboard" />;

  // Logout user completely if not authorised
  if (user && !admins.includes(user.email)) {
    setTimeout(() => {
      signOut(auth);
    }, 3000);
    return (
      <StyledAdminSignupPage>
        <div className="alert show">
          <div className="cancelContainer">
            <Close />
          </div>
          <h3>
            Something went wrong!{" "}
            <span>
              {error ? error : "You are not authorised to access this page"}
            </span>
          </h3>
        </div>
      </StyledAdminSignupPage>
    );
  }

  return (
    <StyledAdminSignupPage>
      <div className="container">
        <Link to="/">
          <img
            src={logo}
            alt=""
            style={{ width: "150px", marginBottom: "10px" }}
          />
        </Link>

        <div className="buttonContainer">
          <button
            className={className}
            onClick={handleSwitch}
            disabled={switched}
          >
            Sign up
          </button>
          <button
            className={switched ? "btn btn-secondary" : "btn btn-primary"}
            onClick={handleSwitch}
            disabled={!switched}
          >
            Login
          </button>
        </div>

        {switched ? (
          <form
            className="signupForm"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            {signUpInputs.map((input) => (
              <FormInput key={input.id} {...input} />
            ))}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        ) : (
          <form className="loginForm" onSubmit={handleSubmit}>
            {loginInputs.map((input) => (
              <FormInput key={input.id} {...input} />
            ))}
            <button type="submit" className="btn btn-primary">
              {" "}
              Login{" "}
            </button>
          </form>
        )}
      </div>

      <div
        className={
          // error || !admins.includes(user?.email) ? "alert show" : "alert"
          error ? "alert show" : "alert"
        }
      >
        <div className="cancelContainer">
          <Close />
        </div>
        <h3>
          Something went wrong!{" "}
          <span>
            {error ? error : "You are not authorised to access this page"}
          </span>
        </h3>
      </div>
    </StyledAdminSignupPage>
  );
};

export default AdminSignUpPage;

const StyledAdminSignupPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  padding: 10px;
  position: relative;
  gap: 20px;

  .alert {
    // let top be at exactly 50% of the screen
    background-color: #fbeeea;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid #f5c6cb;
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    z-index: 100;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    transform: translateY(100%);
    opacity: 0;

    @media screen and (max-width: 320px) {
      max-width: 300px;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    &.show {
      transform: translateY(0);
      opacity: 1;
    }

    .cancelContainer {
      background-color: #fc5758;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        width: 20px;
        height: 20px;
        fill: #fff;
      }
    }

    h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #dc3545;
      span {
        font-weight: 300;
        display: block;
        font-size: 0.9rem;
        color: #344054;
      }
    }
  }

  .alert-danger {
    background-color: red;
    color: #fff;
    padding: 10px 20px;
  }

  .alert-success {
    background-color: #fff;
    padding: 10px 20px;
    color: green;
  }

  .container {
    width: 400px;
    height: max-content;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border: #d0d5dd;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;

    @media screen and (max-width: 475px) {
      width: 300px;
    }

    .buttonContainer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 20px;

      .btn {
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        line-height: 17px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }

      .btn:hover {
        filter: brightness(0.9);
      }

      .btn-primary {
        background-color: #34a853;
        color: #fff;
      }

      .btn-secondary {
        background-color: #d0d5dd;
        color: #fff;
      }

      .btn-secondary:hover {
        background-color: #b3b9c2;
        filter: brightness(1);
      }
    }
  }

  .signupForm,
  .loginForm {
    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
      margin-top: 10px;
      background-color: #344054;
      color: #fff;
      border: none;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      line-height: 17px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      font-family: "Montserrat", sans-serif;

      &:hover {
        filter: brightness(0.9);
      }

      &:disabled {
        background-color: #b3b9c2;
        filter: brightness(1);
      }
    }
  }
`;
