import { ArrowBackIosNewSharp } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TermsAndCondition = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate -1 without clearing the history
        navigate(-1);
    };

    return (
        <StyledTermsAndCondition>
            <div className="termsContainer">
                <h1>Terms and Conditions</h1>
                <p>
                    In consideration of YCT Microfinance Bank Limited granting
                    me Credit Facility. I hereby agree that
                </p>
                <ol>
                    <li>
                        The repayment of the credit facility is against my
                        salary.
                    </li>
                    <li>
                        I authorize that my salary be deducted at source, to
                        cater for my monthly repayment.
                    </li>
                    <li>
                        That this mandate be honoured by any authorized entity
                        through which my salary is being paid.
                    </li>
                    <li>
                        That this mandaate is only reversible upon the
                        liquidation of the loan and confirmed by YCT
                        Microfinance Bank Limited.
                    </li>
                </ol>

                {/* Add button to go back one */}
                <button
                    style={{
                        transition: "all 0.3s ease",
                        width: "max-content",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#344054",
                        border: "none",
                        width: "100%",
                        textAlign: "center",
                        padding: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "#fff",
                        borderRadius: "8px",
                    }}
                    onClick={handleClick}
                >
                    <span>
                        <ArrowBackIosNewSharp />
                    </span>
                    Go back
                </button>
            </div>
        </StyledTermsAndCondition>
    );
};

export default TermsAndCondition;

const StyledTermsAndCondition = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 0 20px;

    .termsContainer {
        background-color: #fff;
        padding: 40px;
        border-radius: 10px;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        h1 {
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 29px;
            color: #34a853;
        }

        p {
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
            color: #000000;
        }

        ol {
            list-style: decimal;
            padding-left: 20px;
            font-style: normal;
            font-size: 18px;
            line-height: 2.4rem;
            // color: #000000;
        }
    }
`;
