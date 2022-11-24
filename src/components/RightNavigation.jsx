import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logoutIcon from "../assets/logout-icon.svg";
import { ReactComponent as Loader } from "../assets/loader.svg";
import { useToken } from "../context/context";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/context";

const StyledRightNav = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;

  .nav-time {
    display: flex;
    align-items: center;
    position: relative;
    gap: 10px;

    button {
      background-color: #344054;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      color: #fff;
      font-family: "Montserrat Alternates";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #83bf4f;
      }

      &:active {
        background-color: #83bf4f;
        transform: scale(0.95);
      }

      &:disabled {
        background-color: #344054;
        cursor: not-allowed;
      }
    }

    .hour-minute-second {
      display: flex;
      gap: 10px;
      font-style: normal;
      line-height: 17px;
      color: #344054;
      font-style: normal;
      font-weight: 700;
      font-size: 20px;

      span {
        color: #344054;

        @media (max-width: 768px) {
          color: #fdc800;
        }
      }
    }

    svg {
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 768px) {
        display: none;
      }

      :hover {
        cursor: pointer;
      }
    }

    .vertical-line {
      width: 1px;
      height: 30px;
      background-color: #d9d9d9;
      margin: 0 20px;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .nav-logout {
    display: flex;
    align-items: center;
    gap: 20px;

    .profile {
      display: flex;
      align-items: center;
      width: 40px;
      justify-content: center;
      height: 40px;
      background-color: #f2f2f2;
      text-align: center;
      border-radius: 50%;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      place-items: center;
      color: #344054;

      @media (max-width: 768px) {
        display: none;
      }

      span {
        margin: auto;
      }
    }
  }

  .logout-container {
    display: flex;
    align-items: center;
    gap: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #344054;
    cursor: pointer;
    justify-content: center;
    background-color: #fff;
    background: #ffffff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 8px;
    img {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 673px) {
    flex-flow: column nowrap;
    background-color: rgb(52, 168, 83);
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 100;

    .nav-time {
      flex-flow: column nowrap;
      gap: 20px;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 100px;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;

      button {
        width: 100%;
      }

      .hour-minute-second {
        width: 100%;
        justify-content: center;
      }
    }

    .logout-container {
    }
  }
`;

const RightNavigation = ({ open }) => {
  const { user, tokenLoading, tokenError, generateAccessToken, expiresIn } =
    useToken();
  const email = user.email;

  // Time
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      let hour = Math.floor(expiresIn / 3600);
      let minute = Math.floor((expiresIn - hour * 3600) / 60);
      let second = expiresIn - hour * 3600 - minute * 60;

      return {
        hour,
        minute,
        second,
      };
    };

    const timer = setTimeout(() => {
      setTime(calculateTimeLeft());
    }, 500);

    return () => clearTimeout(timer);
  }, [expiresIn]);

  let timer;
  const [hour, minute, second] = Object.values(time);

  useEffect(() => {
    timer = setInterval(() => {
      if (second > 0) {
        setTime({
          hour,
          minute,
          second: second - 1,
        });
      } else if (minute > 0) {
        setTime({
          hour,
          minute: minute - 1,
          second: 59,
        });
      } else if (hour > 0) {
        setTime({
          hour: hour - 1,
          minute: 59,
          second: 59,
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hour, minute, second]);

  useEffect(() => {
    if (hour === 0 && minute === 0 && second === 0) {
      generateAccessToken();
    }
  }, [hour, minute, second]);

  // logout
  const { auth } = useAuth();
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <StyledRightNav open={open}>
      <div className="nav-time">
        <button
          disabled={hour === 0 && minute === 0 && second === 0 ? false : true}
          onClick={() => {
            generateAccessToken();
            // start the timer again
            setTime({
              hour: 1,
              minute: 0,
              second: 0,
            });
          }}
          style={{
            background: `${tokenError ? "red" : ""}`,
          }}
        >
          {tokenLoading || tokenError ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Loader
                style={{
                  width: "18px",
                  height: "18px",
                }}
              />
              <span>{tokenError ? tokenError : "loading..."}</span>
            </div>
          ) : (
            // Add the text "Generate Token"

            <span>Generate Token</span>
          )}
        </button>
        <div className="hour-minute-second">
          <span>{hour < 10 ? `0${hour}` : hour}:</span>
          <span>{minute < 10 ? `0${minute}` : minute}:</span>
          <span>{second < 10 ? `0${second}` : second}</span>
        </div>
        <Loader />
      </div>
      <div className="vertical-line">
        <span></span>
      </div>
      <div className="nav-logout">
        <div className="profile">
          <div className="image-profile">
            <span>{user.email && user.email.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="profile-title"></h2>
        </div>
        <div className="logout-container" onClick={handleLogout}>
          <span>Logout</span>
          <img src={logoutIcon} alt="logout icon" />
        </div>
      </div>
    </StyledRightNav>
  );
};

export default RightNavigation;
