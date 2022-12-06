import React, { useEffect, useState } from "react";
import "../userInfoModal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { TbDownload } from "react-icons/tb";
import Avatar from "../assets/avatar.png";
import { useLoading, useSalaryDetails } from "../context/context";
import Skeleton from "./Skeleton";

const UserInfoModal = ({ handleShowUserInfo, showUserInfo }) => {
    const { loading } = useLoading();
    console.log(showUserInfo);

    const { salaryDetails, salaryFullDetails, handleDisbursement } =
        useSalaryDetails();

    const loan = salaryDetails.data && salaryDetails.data.loanHistoryDetails;

    return (
        <div
            className={`userInfoModal`}
            style={{ display: `${showUserInfo ? "block" : "none"}` }}
        >
            <div className="infoBody">
                <div className="infoContent">
                    {/* Close modal Button  */}
                    <button className="closeBtn" onClick={handleShowUserInfo}>
                        <IoMdCloseCircleOutline className="" />
                    </button>
                    {loading ? (
                        <Skeleton type="custom2" />
                    ) : (
                        <>
                            {salaryDetails &&
                            salaryDetails.status !== "success" ? (
                                salaryDetails.responseMsg
                            ) : (
                                <>
                                    {/* UserInfo Section 1  */}

                                    <div className="flex">
                                        <div className="col_1">
                                            {/* {***(Image section )***} */}

                                            <div className="avatarBox">
                                                {false ? (
                                                    <img
                                                        src={Avatar}
                                                        alt="name"
                                                    />
                                                ) : (
                                                    <div className="avatar">
                                                        {salaryDetails.data &&
                                                            salaryDetails.data.customerName.split(
                                                                ""
                                                            )[0]}
                                                    </div>
                                                )}
                                            </div>
                                            {/* {***(other section )***} */}

                                            <div className="subCol pt_29">
                                                <div className="infoTitle">
                                                    Payment Date
                                                </div>
                                                <div className="infoResult">
                                                    {salaryDetails.data &&
                                                        salaryDetails.data.firstPaymentDate.split(
                                                            " "
                                                        )[0]}
                                                </div>
                                            </div>
                                            <div className="subCol pt_14">
                                                <div className="infoTitle">
                                                    Amount:
                                                </div>
                                                <div className="infoResult">
                                                    {salaryFullDetails &&
                                                        salaryFullDetails.loanAmount}
                                                </div>
                                            </div>
                                            <div className="subCol pt_14">
                                                <div className="infoTitle">
                                                    Acount Number
                                                </div>
                                                <div className="infoResult">
                                                    {salaryDetails.data &&
                                                        salaryDetails.data
                                                            .accountNumber}
                                                </div>
                                            </div>

                                            <div className="subCol pt_14">
                                                <div className="infoTitle">
                                                    Bank Code
                                                </div>
                                                <div className="infoResult">
                                                    {data && data.data.bankCode}
                                                </div>
                                            </div>
                                        </div>
                                        {/* UserInfo Section 2  */}

                                        <div className="col_2">
                                            <div>
                                                <h3>Loan Details:</h3>
                                            </div>

                                            <div className="subCol pt_16">
                                                <div className="infoTitle">
                                                    Loan Provider:
                                                </div>
                                                <div className="infoResult">
                                                    {loan.length !== 0
                                                        ? loan[0].loanProvider
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="subCol pt_16">
                                                <div className="infoTitle">
                                                    Loan Amount
                                                </div>
                                                <div className="infoResult">
                                                    {loan.length !== 0
                                                        ? loan[0].loanAmount
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="subCol pt_16">
                                                <div className="infoTitle">
                                                    Outstanding Amount
                                                </div>
                                                <div className="infoResult">
                                                    {loan.length !== 0
                                                        ? loan[0]
                                                              .outstandingAmount
                                                        : "Not Available"}
                                                </div>
                                            </div>

                                            <div className="subCol pt_16">
                                                <div className="infoTitle">
                                                    Status
                                                </div>
                                                <div className="infoResult">
                                                    {loan.length !== 0
                                                        ? loan[0].status
                                                        : "Not Available"}
                                                </div>
                                            </div>

                                            <div className="subCol pt_16">
                                                <div className="infoTitle">
                                                    Loan Disbursement Date
                                                </div>
                                                <div className="infoResult">
                                                    {loan.length !== 0
                                                        ? loan[0]
                                                              .loanDisbursementDate
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="subCol pt_16">
                                                <div className="infoTitle">
                                                    Repayment Amount
                                                </div>
                                                <div className="infoResult">
                                                    {loan.length !== 0
                                                        ? loan[0]
                                                              .repaymentAmount
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                            <div className="subCol pt_16">
                                                <div className="infoTitle">
                                                    Repayment Freq
                                                </div>
                                                <div className="infoResult">
                                                    {loan.length !== 0
                                                        ? loan[0].repaymentFreq
                                                        : "Not Available"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SALARY TABLE  */}

                                    <div>
                                        <h3>Salary Details:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Account No.</th>
                                                    <th>Bank Code</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {true ? (
                                                    <tr>
                                                        <td
                                                            style={{
                                                                fontWeight:
                                                                    "800",
                                                            }}
                                                        >
                                                            Salary details not
                                                            Available
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <>
                                                        {data &&
                                                            salaryDetails.data.salaryPaymentDetails.map(
                                                                (cell, i) => {
                                                                    return (
                                                                        <tr
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            <td>
                                                                                {
                                                                                    cell.paymentDate.split(
                                                                                        " "
                                                                                    )[0]
                                                                                }
                                                                            </td>
                                                                            appro
                                                                            <td>
                                                                                {
                                                                                    cell.amount
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    cell.accountNumber
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    cell.bankCode
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )}
                                                    </>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* *********BUttons ****** */}

                                    <div
                                        className="flex"
                                        style={{ flexDirection: "row" }}
                                    >
                                        <div className="approve">
                                            <button
                                                onClick={() => {
                                                    handleDisbursement(
                                                        salaryDetails.data
                                                            .customerId
                                                    );
                                                }}
                                            >
                                                <span>
                                                    <FcCheckmark className="icon" />
                                                </span>
                                                Disburse Loan
                                            </button>
                                        </div>
                                        {/* Button_two  */}
                                        <div className="save">
                                            <button
                                                onClick={() => window.print()}
                                            >
                                                <span>
                                                    <TbDownload className="icon" />
                                                </span>
                                                Save as PDF
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const data = {
    status: "success",
    hasData: true,
    responseId: "1633886042479/1633886042479",
    responseDate: "10-10-2021 17:14:03+0000",
    requestDate: "10-10-2021 17:14:02+0000",
    responseCode: "00",
    responseMsg: "SUCCESS",
    data: {
        customerId: "1366",
        accountNumber: "5012284010",
        bankCode: "023",
        bvn: null,
        companyName: "National Youth Secrvice Corps",
        customerName: "Teresa Stoker",
        category: null,
        firstPaymentDate: "10-08-2020 00:00:00+0000",
        salaryCount: "6",
        salaryPaymentDetails: [
            {
                paymentDate: "25-06-2021 13:33:46+0000",
                amount: "155000",
                accountNumber: "5012284010",
                bankCode: "023",
            },
            {
                paymentDate: "25-05-2021 13:33:46+0000",
                amount: "155000",
                accountNumber: "5012284010",
                bankCode: "023",
            },
            {
                paymentDate: "25-04-2021 13:33:46+0000",
                amount: "155000",
                accountNumber: "5012284010",
                bankCode: "023",
            },
            {
                paymentDate: "25-03-2021 13:33:46+0000",
                amount: "155000",
                accountNumber: "5012284010",
                bankCode: "023",
            },
            {
                paymentDate: "25-02-2021 13:33:46+0000",
                amount: "155000",
                accountNumber: "5012284010",
                bankCode: "023",
            },
            {
                paymentDate: "25-01-2021 13:33:46+0000",
                amount: "155000",
                accountNumber: "5012284010",
                bankCode: "023",
            },
        ],
        loanHistoryDetails: [
            {
                loanProvider: "*******",
                loanAmount: 5000,
                outstandingAmount: 5650,
                loanDisbursementDate: "19-08-2021 00:00:00+0000",
                status: "NEW",
                repaymentAmount: 5650,
                repaymentFreq: "MONTHLY",
            },
        ],
        originalCustomerId: "1366",
    },
};
export default UserInfoModal;

const bj = {
    status: "success",
    hasData: false,
    responseId: "09076060579/09076060579",
    responseDate: "25-11-2022 17:30:26+0000",
    requestDate: "25-11-2022 17:30:25+0000",
    responseCode: "00",
    responseMsg: "SUCCESS",
    data: {
        customerId: "1366",
        accountNumber: "5012284010",
        bankCode: "023",
        bvn: null,
        companyName: "National Youth Secrvice Corps",
        customerName: "Teresa Stoker",
        category: null,
        firstPaymentDate: "10-08-2020 00:00:00+0000",
        salaryCount: "0",
        salaryPaymentDetails: [],
        loanHistoryDetails: [],
        originalCustomerId: "1366",
    },
};
