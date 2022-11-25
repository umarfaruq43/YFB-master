import React from "react";
import "../userInfoModal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { TbDownload } from "react-icons/tb";
import Avatar from "../assets/avatar.png";
const UserInfoModal = ({ handleShowUserInfo, showUserInfo }) => {
    return (
        <div className={`userInfoModal ${showUserInfo ? "show" : ""}`}>
            <div className="infoBody">
                <div className="infoContent">
                    {/* Close modal Button  */}
                    <button className="closeBtn" onClick={handleShowUserInfo}>
                        <IoMdCloseCircleOutline className="" />
                    </button>

                    {/* UserInfo Section 1  */}

                    <div className="flex">
                        <div className="col_1">
                            {/* {***(Image section )***} */}

                            <div className="avatarBox">
                                {false ? (
                                    <img src={Avatar} alt="name" />
                                ) : (
                                    <div className="avatar">
                                        {" "}
                                        {data &&
                                            data.data.customerName.split(
                                                ""
                                            )[0]}{" "}
                                    </div>
                                )}
                            </div>
                            {/* {***(other section )***} */}

                            <div className="subCol pt_29">
                                <div className="infoTitle">Payment Date</div>
                                <div className="infoResult">
                                    {data &&
                                        data.data.firstPaymentDate.split(
                                            " "
                                        )[0]}
                                </div>
                            </div>
                            <div className="subCol pt_14">
                                <div className="infoTitle">Amount:</div>
                                <div className="infoResult">155,000.00</div>
                            </div>
                            <div className="subCol pt_14">
                                <div className="infoTitle">Acount Number</div>
                                <div className="infoResult">
                                    {data && data.data.accountNumber}
                                </div>
                            </div>

                            <div className="subCol pt_14">
                                <div className="infoTitle">Bank Code</div>
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
                                <div className="infoTitle">Loan Provider:</div>
                                <div className="infoResult">********</div>
                            </div>
                            <div className="subCol pt_16">
                                <div className="infoTitle">Loan Amount</div>
                                <div className="infoResult">5,000</div>
                            </div>
                            <div className="subCol pt_16">
                                <div className="infoTitle">
                                    Outstanding Amount
                                </div>
                                <div className="infoResult">5650</div>
                            </div>

                            <div className="subCol pt_16">
                                <div className="infoTitle">Status</div>
                                <div className="infoResult">New</div>
                            </div>

                            <div className="subCol pt_16">
                                <div className="infoTitle">
                                    Loan Disbursement Date
                                </div>
                                <div className="infoResult">
                                    19-08-2021 00:00:00+0000
                                </div>
                            </div>
                            <div className="subCol pt_16">
                                <div className="infoTitle">
                                    Repayment Amount
                                </div>
                                <div className="infoResult">5600</div>
                            </div>
                            <div className="subCol pt_16">
                                <div className="infoTitle">Repayment Freq</div>
                                <div className="infoResult">Monthly</div>
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
                                {data &&
                                    data.data.salaryPaymentDetails.map(
                                        (cell, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        {" "}
                                                        {
                                                            cell.paymentDate.split(
                                                                " "
                                                            )[0]
                                                        }{" "}
                                                    </td>
                                                    <td> {cell.amount} </td>
                                                    <td>
                                                        {" "}
                                                        {
                                                            cell.accountNumber
                                                        }{" "}
                                                    </td>
                                                    <td> {cell.bankCode} </td>
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </table>
                    </div>

                    {/* <div>
                        <h3>Loan Details:</h3>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th> Provider</th>
                                    <th>Amount</th>
                                    <th>Outstanding</th>
                                    <th>Repayment</th>
                                    <th>Frequence</th>
                                </tr>
                            </thead>
                            <tbody>
                            {salaryPaymentDetails.map((cell, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {" "}
                                            {
                                                cell.paymentDate.split(" ")[0]
                                            }{" "}
                                        </td>
                                        <td> {cell.amount} </td>
                                        <td> {cell.accountNumber} </td>
                                        <td> {cell.bankCode} </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        </table>
                    </div> */}

                    {/* *********BUttons ****** */}

                    <div className="flex" style={{ flexDirection: "row" }}>
                        <div className="approve">
                            <button>
                                <span>
                                    <FcCheckmark className="icon" />
                                </span>
                                Approve Loan
                            </button>
                        </div>
                        {/* Button_two  */}
                        <div className="save">
                            <button onClick={() => window.print()}>
                                <span>
                                    <TbDownload className="icon" />
                                </span>
                                Save as PDF
                            </button>
                        </div>
                    </div>
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

