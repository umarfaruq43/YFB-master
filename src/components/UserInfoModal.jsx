import React from "react";
import "../userInfoModal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { TbDownload } from "react-icons/tb";
// import Avatar from "../assets/avatar.png";
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

                    <div className="col_1">
                        <div className="avatar">M</div>
                        <div className="subCol pt_29">
                            <div className="infoTitle">Payment Date</div>
                            <div className="infoResult">25-03-2021</div>
                        </div>
                        <div className="subCol pt_14">
                            <div className="infoTitle">Amount:</div>
                            <div className="infoResult">155,000.00</div>
                        </div>
                        <div className="subCol pt_14">
                            <div className="infoTitle">Acount Number</div>
                            <div className="infoResult">220896383</div>
                        </div>

                        <div className="subCol pt_14">
                            <div className="infoTitle">Bank Code</div>
                            <div className="infoResult">029</div>
                        </div>

                        <div>
                            <button>
                                <span>
                                    <FcCheckmark className="icon" />
                                </span>
                                Approve Loan
                            </button>
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
                            <div className="infoTitle">Outstandinng Amount</div>
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
                            <div className="infoTitle">Repayment Amount</div>
                            <div className="infoResult">5600</div>
                        </div>
                        <div className="subCol pt_16">
                            <div className="infoTitle">Repayment Freq</div>
                            <div className="infoResult">Monthly</div>
                        </div>
                        <div>
                            <button>
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

export default UserInfoModal;
