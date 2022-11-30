import React from "react";
import DisbursementForm from "../components/DisbursementForm";
import HeaderDashboard from "../components/HeaderDashboard";

const AdminDisbursementPage = () => {
    return (
        <>
            <HeaderDashboard />
            <>
                <DisbursementForm />
            </>
        </>
    );
};

export default AdminDisbursementPage;
