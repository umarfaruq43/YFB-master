import React, { useEffect, useState } from "react";
import "../userInfoModal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { TbDownload } from "react-icons/tb";
import Avatar from "../assets/avatar.png";
import { useLoading, useMdHistory, useSalaryDetails } from "../context/context";
import Skeleton from "./Skeleton";

const MandateHistory = ({ }) => {
   const { loading } = useLoading();
   const { mdHistoryAction, setMdHistoryAction, mdHistoryResponse } =
      useMdHistory();

   return (
      <div
         className={`userInfoModal`}
         style={{ display: `${mdHistoryAction ? "block" : "none"}` }}
      >
         <div className="infoBody">
            <div className="infoContent">
               {/* Close modal Button  */}
               <button
                  className="closeBtn"
                  onClick={() => setMdHistoryAction(false)}
               >
                  <IoMdCloseCircleOutline className="" />
               </button>
               {loading ? (
                  <Skeleton type="custom2" />
               ) : (
                  <>
                     {mdHistoryResponse &&
                        mdHistoryResponse.status !== "success" ? (
                        mdHistoryResponse.responseMsg
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
                                          {mdHistoryResponse &&
                                             mdHistoryResponse.data.firstName.split(
                                                ""
                                             )[0]}
                                       </div>
                                    )}
                                 </div>
                                 {/* {***(other section )***} */}

                                 <div className="subCol pt_29">
                                    <div className="infoTitle">
                                       First Name:
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .firstName}
                                    </div>
                                 </div>

                                 <div className="subCol pt_3">
                                    <div className="infoTitle">
                                       Last Name:
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .lastName}
                                    </div>
                                 </div>

                                 <div className="subCol pt_3">
                                    <div className="infoTitle">
                                       Phone Number:
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .phoneNumber}
                                    </div>
                                 </div>
                                 <div className="subCol pt_3">
                                    <div className="infoTitle">
                                       Salary Account
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .salaryAccount}
                                    </div>
                                 </div>
                                 <div className="subCol pt_3">
                                    <div className="infoTitle">
                                       Bank Code
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .salaryBankCode}
                                    </div>
                                 </div>

                                 <div className="subCol pt_3">
                                    <div className="infoTitle">
                                       Lender Details
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .lenderDetails}
                                    </div>
                                 </div>

                                 {/* <div className="subCol pt_3">
                                                <div className="infoTitle">
                                                    Repayment
                                                </div>
                                                <div className="infoResult">
                                                    {mdHistoryResponse &&
                                                        mdHistoryResponse.data
                                                            .repayment}
                                                </div>
                                            </div> */}

                                 <div className="subCol pt_3">
                                    <div className="infoTitle">
                                       Disbursement Account Bank
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .disbursementAccountBank}
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
                                       Total Disbursed
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .totalDisbursed}
                                    </div>
                                 </div>
                                 <div className="subCol pt_16">
                                    <div className="infoTitle">
                                       Employer Name
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .employerName}
                                    </div>
                                 </div>

                                 <div className="subCol pt_16">
                                    <div className="infoTitle">
                                       Status
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .status}
                                    </div>
                                 </div>

                                 <div className="subCol pt_16">
                                    <div className="infoTitle">
                                       Collection Start Date
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .collectionStartDate}
                                    </div>
                                 </div>
                                 <div className="subCol pt_16">
                                    <div className="infoTitle">
                                       Disbursement Account
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .disbursementAccount}
                                    </div>
                                 </div>
                                 <div className="subCol pt_16">
                                    <div className="infoTitle">
                                       Date Of Disbursement
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .dateOfDisbursement}
                                    </div>
                                 </div>

                                 <div className="subCol pt_16">
                                    <div className="infoTitle">
                                       Outstanding Loan Bal
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .outstandingLoanBal}
                                    </div>
                                 </div>

                                 <div className="subCol pt_16">
                                    <div className="infoTitle">
                                       Loan Repayment Ref
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .loanRepaymentRef}
                                    </div>
                                 </div>

                                 <div className="subCol pt_16">
                                    <div className="infoTitle">
                                       disbursement Account Bank
                                    </div>
                                    <div className="infoResult">
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .disbursementAccountBank}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* Repay ment details */}
                           <div className="" style={{ marginTop: "20px" }} >
                              <h3 style={{ marginBottom: "25px" }}>
                                 Repayment Details:
                              </h3>
                              <div className="tableBox">
                                 <table className="styled-table">
                                    <thead>
                                       <tr>
                                          <th>Deduction Date</th>
                                          <th>Payment Status</th>
                                          <th>
                                             Transaction Amount
                                          </th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {mdHistoryResponse &&
                                          mdHistoryResponse.data
                                             .repayment === null ? (
                                          <tr>
                                             <td
                                                style={{
                                                   fontWeight:
                                                      "800",
                                                }}
                                             >
                                                Repayment details
                                                not Available
                                             </td>
                                          </tr>
                                       ) : (
                                          <>
                                             {mdHistoryResponse &&
                                                mdHistoryResponse.data.repayment.map(
                                                   (
                                                      cell,
                                                      i
                                                   ) => {
                                                      return (
                                                         <tr
                                                            key={
                                                               i
                                                            }
                                                         >
                                                            <td>
                                                               {
                                                                  cell.deductiondate.split(" ")[0]
                                                               }
                                                            </td>

                                                            <td>
                                                               {
                                                                  cell.paymentstatus
                                                               }
                                                            </td>
                                                            <td>
                                                               {
                                                                  cell.transactionamount
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

export default MandateHistory;
