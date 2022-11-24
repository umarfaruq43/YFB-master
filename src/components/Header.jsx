import { Outlet } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/yfb-logo.svg";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    background-color: #34a853;
    border-bottom: 1px solid #83bf4f;
  }

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

      span {
        color: #34a853;

        @media (max-width: 768px) {
          color: #fdc800;
        }
      }
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <nav>
        <Link to="/">
          <img src={logo} alt="yfb logo" />
        </Link>
        <Link to="/signup">
          Admin? <span>Sign in</span>
        </Link>
        {/* <Outlet /> */}
      </nav>
    </StyledHeader>
  );
};

export default Header;
