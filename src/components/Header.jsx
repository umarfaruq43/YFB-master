import { Outlet } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/yfb-logo.png";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    background-color: #108d39;
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
    margin-top: -37px;

    @media (max-width: 768px) {
      margin-top: 0;
    }

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
        color: #007526;

        @media (max-width: 768px) {
          color: #fdc800;
          margin-top: ;
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
          <img
            src={logo}
            alt="yfb logo"
            style={{
              width: "187px",
            }}
          />
        </Link>
        <Link
          to="/signup"
          style={
            {
              // marginTop: "-57px",
            }
          }
        >
          Admin? <span>Sign in</span>
        </Link>
        {/* <Outlet /> */}
      </nav>
    </StyledHeader>
  );
};

export default Header;
