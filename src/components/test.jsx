import { useLoading, useSalaryDetails } from "../context/context";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";

const UserInfoModal = ({ handleShowUserInfo, showUserInfo }) => {
  const { loading } = useLoading();
  const { salaryDetails, handleDisbursement } = useSalaryDetails();
  console.log(salaryDetails);
  const loan = salaryDetails.data && salaryDetails.data.loanHistoryDetails;

  const navigate = useNavigate();

  return (
    <div className={`userInfoModal ${showUserInfo ? "show" : ""}`}>
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
              {salaryDetails && salaryDetails.status !== "success" ? (
                salaryDetails.responseMsg
              ) : (
                <>
                  {/* UserInfo Section 1  */}

                  <div className="flex">
                    <div className="col_1">
                      {/* {***(Image section )***} */}

                      <div className="avatarBox">
                        {false ? (
                          <img src={Avatar} alt="name" />
                        ) : (
                          <div className="avatar">
                            {salaryDetails.data &&
                              salaryDetails.data.customerName.split("")[0]}
                          </div>
                        )}
                      </div>
                      {/* {***(other section )***} */}

                      <div className="subCol pt_29">
                        <div className="infoTitle">Payment Date</div>
                        <div className="infoResult">
                          {salaryDetails.data &&
                            salaryDetails.data.firstPaymentDate.split(" ")[0]}
                        </div>
                      </div>
                      <div className="subCol pt_14">
                        <div className="infoTitle">Amount:</div>
                        <div className="infoResult">Pending...</div>
                      </div>
                      <div className="subCol pt_14">
                        <div className="infoTitle">Acount Number</div>
                        <div className="infoResult">
                          {salaryDetails.data &&
                            salaryDetails.data.accountNumber}
                        </div>
                      </div>

                      <div className="subCol pt_14">
                        <div className="infoTitle">Bank Code</div>
                        <div className="infoResult">
                          {salaryDetails.data && salaryDetails.data.bankCode}
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
                        <div className="infoResult">
                          {loan.length !== 0
                            ? loan[0].loanProvider
                            : "Not Available"}
                        </div>
                      </div>
                      <div className="subCol pt_16">
                        <div className="infoTitle">Loan Amount</div>
                        <div className="infoResult">
                          {loan.length !== 0
                            ? loan[0].loanAmount
                            : "Not Available"}
                        </div>
                      </div>
                      <div className="subCol pt_16">
                        <div className="infoTitle">Outstanding Amount</div>
                        <div className="infoResult">
                          {loan.length !== 0
                            ? loan[0].outstandingAmount
                            : "Not Available"}
                        </div>
                      </div>

                      <div className="subCol pt_16">
                        <div className="infoTitle">Status</div>
                        <div className="infoResult">
                          {loan.length !== 0 ? loan[0].status : "Not Available"}
                        </div>
                      </div>

                      <div className="subCol pt_16">
                        <div className="infoTitle">Loan Disbursement Date</div>
                        <div className="infoResult">
                          {loan.length !== 0
                            ? loan[0].loanDisbursementDate
                            : "Not Available"}
                        </div>
                      </div>
                      <div className="subCol pt_16">
                        <div className="infoTitle">Repayment Amount</div>
                        <div className="infoResult">
                          {loan.length !== 0
                            ? loan[0].repaymentAmount
                            : "Not Available"}
                        </div>
                      </div>
                      <div className="subCol pt_16">
                        <div className="infoTitle">Repayment Freq</div>
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
                                fontWeight: "800",
                              }}
                            >
                              Salary details not Available
                            </td>
                          </tr>
                        ) : (
                          <>
                            {data &&
                              data.data.salaryPaymentDetails.map((cell, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{cell.paymentDate.split(" ")[0]}</td>
                                    appro
                                    <td>{cell.amount}</td>
                                    <td>{cell.accountNumber}</td>
                                    <td>{cell.bankCode}</td>
                                  </tr>
                                );
                              })}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* *********BUttons ****** */}

                  <div className="flex" style={{ flexDirection: "row" }}>
                    <div className="approve">
                      <button
                        onClick={() =>
                          handleDisbursement(salaryDetails.data.customerId)
                        }
                      >
                        <span>
                          <FcCheckmark className="icon" />
                        </span>
                        Disburse Loan
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
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
