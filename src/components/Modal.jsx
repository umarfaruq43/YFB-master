import React from "react";
import "../styles/modal.css";
import { FaTimes } from "react-icons/fa";
import { useMdHistory, useStopLoss } from "../context/context";
import Skeleton from "./Skeleton";

const Modal = () => {
    const { loading, setApproveLoanModal, stopLossResult, setStopLossResult } =
        useStopLoss();

    const { mdHistoryResponse, mdHistoryAction, setMdHistoryAction } =
        useMdHistory();
    return (
        <div className="modalLayout">
            <div className="modalContent">
                <div
                    className="close"
                    onClick={() => {
                        setApproveLoanModal(false);
                        setStopLossResult(null);
                        setMdHistoryAction(false);
                    }}
                >
                    <FaTimes />
                </div>
                {/* Modal Text */}
                <div className="modal_text">
                    <div>{loading ? <Skeleton type="custom2" /> : ""}</div>
                    <div>
                        {/* stopLoss result display  */}
                        {stopLossResult && stopLossResult.status === "success"
                            ? "Loan stop successfully"
                            : ""}
                        {stopLossResult && stopLossResult.status !== "success"
                            ? "Unable to stop loan"
                            : ""}

                        {/* mandate history result display  */}

                        {mdHistoryAction ? (
                            <div>
                                {mdHistoryResponse &&
                                mdHistoryResponse.status === "success"
                                    ? "Mandate History fetched successfully"
                                    : ""}
                                {mdHistoryResponse &&
                                mdHistoryResponse.status !== "success"
                                    ? "Unable to fetch Mandate History"
                                    : ""}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
