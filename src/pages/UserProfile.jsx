import React from "react";
import { useParams } from "react-router-dom";
import HeaderDashboard from "../components/HeaderDashboard";
import Skeleton from "../components/Skeleton";
import { dbContext } from "../context/context";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import {
  ArrowBackIosNewSharp,
  Backspace,
  CopyAll,
  Email,
  Phone,
} from "@mui/icons-material";
import UserProfileCard from "../components/UserProfileCard";

const UserProfile = () => {
  const { data: userData, dataLoading, user: userAuth } = dbContext();
  const { userId } = useParams();
  const users = userData === undefined ? [] : userData;
  const user = users.find((user) => user.id === userId);

  // load skeleton if data is loading
  if (dataLoading) {
    return <Skeleton type="custom" />;
  }

  // if user is not found

  if (!userAuth) return <Navigate to="/signup" />;

  if (!user) {
    return (
      <div>
        <HeaderDashboard />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "calc(100vh - 80px)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginTop: "2rem",
              color: "var(--color-primary)",
            }}
          >
            User not found
          </h1>
          {/* go back dashboard */}
          <button
            style={{
              backgroundColor: "#212939",
              padding: "17px 35px",
              border: "none",
              borderRadius: "0.5rem",
              marginTop: "2rem",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
              letterSpacing: "0.05rem",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const {
    BVN,
    accountNumber,
    bank,
    email,
    firstName,
    id,
    lastName,
    middleName,
    number: idNumber,
    telephone,
  } = user;

  return (
    <>
      <HeaderDashboard />
      <StyledUserProfile>
        <div className="userProfile-content">
          <h3>User Profile</h3>
          <div className="profile-card__header">
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Avatar src={user.avatar} alt={user.name} />
              <div
                className="icons"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                {/* call the user */}
                <a href={`tel:${telephone}`}>
                  <Phone />
                </a>
                {/* Email the user */}
                {/* <a href={`mailto:${email}`}> */}
                <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
                  <Email />
                </a>
              </div>
            </div>

            <div className="profile-card__header__info">
              <table>
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>{firstName}</td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>{lastName}</td>
                  </tr>
                  <tr>
                    <th>Middle Name</th>
                    <td>{middleName}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="profile-card__body">
            <UserProfileCard title="Id" value={idNumber} icon={<CopyAll />} />
            <UserProfileCard
              title="Account Number"
              value={accountNumber}
              icon={<CopyAll />}
            />{" "}
            <UserProfileCard title="BVN" value={BVN} icon={<CopyAll />} />
            <UserProfileCard title="Email" value={email} icon={<CopyAll />} />
            <UserProfileCard
              title="Bank Code"
              value={bank}
              icon={<CopyAll />}
            />
            <UserProfileCard
              title="Telephone"
              value={telephone}
              icon={<CopyAll />}
            />
            <UserProfileCard
              title="First Name"
              value={firstName}
              icon={<CopyAll />}
            />
            <UserProfileCard
              title="Last Name"
              value={lastName}
              icon={<CopyAll />}
            />
            <UserProfileCard
              title="Middle Name"
              value={middleName}
              icon={<CopyAll />}
            />
          </div>

          {/* Go back button */}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#344054",
                padding: "17px 35px",
                border: "none",
                borderRadius: "0.5rem",
                marginTop: "2rem",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
                letterSpacing: "0.05rem",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                width: "max-content",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                // go back one page
                window.history.back();
              }}
            >
              <span>
                <ArrowBackIosNewSharp />
              </span>
              Go back
            </button>
          </div>
        </div>
      </StyledUserProfile>
    </>
  );
};

export default UserProfile;

const StyledUserProfile = styled.div`
  .userProfile-content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 10px;
    padding-top: 50px;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 50px;
    // height: calc(100vh - 80px);

    a {
      color: #ccc;
      transition: all 0.3s ease;

      &:hover {
        color: #34a853;
      }
    }

    h3 {
        font-family: "Montserrat Alternates";
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #34a853;
    }

    .profile-card__header {
      // background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      transition: all 0.3s ease-in-out;
      background-color: #344054;
      color: #ccc;
    }

    .profile-card__header__info {
    //   display: flex;
      //   flex-direction: column;
      //   gap: 10px;

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            font-size: 1.2rem;
            font-weight: 500;
            color: #e5e5e5;

            td {
                padding: 10px;
                // border-bottom: 1px solid #e5e5e5;
                font-weight: 300;
            }

            th {
                padding: 10px;
                // border-bottom: 1px solid #e5e5e5;
                font-weight: 500;
                text-align: left;
            }

    }
  }

  .profile-card__body{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

  }
`;
