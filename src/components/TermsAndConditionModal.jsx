import { Close } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTermsAndConditionModal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 1000;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;
  background-color: #344054;
  color: #ccc;

  .modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease-in-out;
    background-color: #344054;
    color: #ccc;

    .modal-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding: 20px;
      align-items: center;
      border-radius: 10px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      transition: all 0.3s ease-in-out;
      background-color: #344054;
      color: #ccc;

      h2 {
        font-family: "Poppins", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
      }

      a {
        color: #ccc;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

      }

      a:hover {
        color: #fff;
      }
    }

    .modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      p {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
      }

      hr {
        width: 100%;
        height: 1px;
        background: #ccc;
      }

      ol {
        padding-left: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        li {
          line-height: 25px;

      }
  }
`;

const TermsAndConditionModal = ({ closeTermsModal }) => {
  return (
    <StyledTermsAndConditionModal>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Terms and Conditions</h2>
          <Link onClick={closeTermsModal}>
            <Close />
          </Link>
        </div>
        <div className="modal-body">
          <p>
            In consideration of YCT Microfinance Bank Limited granting me Credit
            Facility. I hereby agree that
          </p>
          <hr />
          <ol>
            <li>The repayment of the credit facility is against my salary.</li>
            <li>
              I authorize that my salary be deducted at source, to cater for my
              monthly repayment.
            </li>
            <li>
              That this mandate be honoured by any authorized entity through
              which my salary is being paid.
            </li>
            <li>
              That this mandaate is only reversible upon the liquidation of the
              loan and confirmed by YCT Microfinance Bank Limited.
            </li>
          </ol>
        </div>
        {/* <div className="modal-footer">
          <button onClick={closeTermsModal}>Close</button>
        </div> */}
      </div>
    </StyledTermsAndConditionModal>
  );
};

export default TermsAndConditionModal;
