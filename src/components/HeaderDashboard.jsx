import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/yfb-logo-light.svg";
import { useAuth } from "../context/context";
import Burger from "./Burger";
import RightNavigation from "./RightNavigation";

const StyledHeaderDashboard = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;

  nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: none;
      color: #344054;
      font-family: "Montserrat Alternates";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const HeaderDashboard = () => {
  const { user, logout, loading } = useAuth();
  const email = user.email;
  return (
    <StyledHeaderDashboard>
      <nav>
        <Link to="/">
          <img src={logo} alt="yfb logo" />
        </Link>
        {/* <div className="nav-right">
          <div className="nav-time">
            <button>Generate Token</button>
            <div className="hour-minute-second">
              <span>00:</span>
              <span>00:</span>
              <span>00</span>
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
            <div className="logout-container">
              <span>Logout</span>
              <img src={logoutIcon} alt="logout icon" />
            </div>
          </div>
        </div> */}
        <Burger />
      </nav>
    </StyledHeaderDashboard>
  );
};

export default HeaderDashboard;
