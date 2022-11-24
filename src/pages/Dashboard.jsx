import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/context";
import { Navigate } from "react-router-dom";
import HeaderDashboard from "../components/HeaderDashboard";
import styled from "styled-components";
import { dbContext } from "../context/context";
import SortingTable from "../components/SortingTable";
import PaginationTable from "../components/PaginationTable";

const StyledDashboard = styled.header`
    background-color: #f6f6f6;

    .dashboard-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
        padding-top: 50px;
        background-color: transparent;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-bottom: 50px;

        .dashboad-header {
            display: flex;
            align-items: center;
            gap: 20px;
            // justify-content: space-between;

            .dashboard-title {
                font-family: "Montserrat Alternates";
                font-style: normal;
                font-weight: 600;
                font-size: 24px;
                line-height: 29px;
                color: #34a853;
            }

            .dashboard-search-container {
                // take up the rest of the space
                flex: 1;
                background-color: #ededed;

                display: flex;
                align-items: center;
                gap: 10px;
                padding-left: 32px;
                padding-right: 32px;
                border-radius: 10px;

                .dashboard-search {
                    border: none;
                    outline: none;
                    flex: 1;
                    height: 64px;
                    background-color: transparent;
                    font-size: 18px;

                    &::placeholder {
                        color: #939393;
                    }

                    &:focus,
                    &:active,
                    &:focus-visible {
                        outline: none;
                    }

                    // remove the clear button
                    &::-ms-clear {
                        display: none;
                    }

                    &::-webkit-search-cancel-button {
                        display: none;
                    }
                }

                .dashboard-search-icon {
                    color: #939393;
                }

                .clear-icon {
                    display: none;
                }

                &:hover {
                    .clear-icon {
                        display: block;
                    }
                }
            }
        }

        .dashboard-subheader {
            display: flex;
            align-items: center;
            gap: 20px;

            button {
                border: none;
                outline: none;
                cursor: pointer;
                font-weight: 600;
                font-size: 16px;
                line-height: 29px;
                padding: 10px 24px;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
                color: #fff;
            }

            button:nth-child(1) {
                background-color: #34a853;

                &:hover {
                    background-color: #2e8b46;
                }
            }

            button:nth-child(2) {
                background-color: #667085;

                &:hover {
                    background-color: #4e5665;
                }
            }

            svg {
                background-color: #f6f6f6;
                color: #939393;
                cursor: pointer;
            }
        }
    }
`;

const Dashboard = () => {
    const { user, handleSignOut, auth } = useAuth();
    const logout = async () => {
        await signOut(auth);
    };

    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleClearSearchInput = () => {
        setSearchInput("");
    };

    const { data, dataLoading } = dbContext();


    if (!user) return <Navigate to="/signup" />;

    return (
        <>
            <HeaderDashboard />
            <StyledDashboard>
                <div className="dashboard-content">
                    <div className="dashboad-header">
                        <h3 className="dashboard-title">Dashboard</h3>
                    </div>

                    <div className="dashboard-subheader">
                        <button>All Clients</button>
                        <button>Approved</button>
                    </div>
                    <PaginationTable data={data} />
                </div>
            </StyledDashboard>
        </>
    );
};

export default Dashboard;
