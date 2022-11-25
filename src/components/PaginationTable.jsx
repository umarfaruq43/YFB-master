import React, { useContext, useMemo, useState } from "react";
import { dbContext } from "../context/context";
import { COLUMNS } from "./columns";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import styled from "styled-components";
import GlobalFilter from "./GlobalFilter";
import { ArrowDropDown, ArrowDropUp, FilterListOff } from "@mui/icons-material";
import Skeleton from "./Skeleton";
import { Global } from "@emotion/react";
import { useDelete } from "../context/context";
import UserInfoModal from "../components/UserInfoModal";

const PaginationTable = ({}) => {
    const { data: userData, dataLoading } = dbContext();
    //     state to toggle user info  modal
    const [showUserInfo, setShowUserInfo] = useState(false);

    //  function to togggle the user info modal

    const handleShowUserInfo = () => {
        setShowUserInfo(!showUserInfo);
    };

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => userData, [userData]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },

        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { user, getUserInfo, deleteUser } = useDelete();

    const deleteRow = (id) => {
        if (id === "Del") {
            // ask for confirmation
            if (window.confirm("Are you sure you want to delete this user?")) {
                deleteUser(id);
            } else {
                return;
            }
        }

        //    window.confirm("Are you sure you want to delete?");
        //    deleteUser(cell.row.original.id);
        //  } else if (window.confirm === false) {
        //    return;
        //  }
    };

    return (
        <>
            <UserInfoModal
                showUserInfo={showUserInfo}
                handleShowUserInfo={handleShowUserInfo}
            />
            {dataLoading ? (
                <Skeleton type="custom2" />
            ) : (
                <>
                    <GlobalFilter
                        filter={tableInstance.state.globalFilter}
                        setFilter={tableInstance.setGlobalFilter}
                    />
                    <StyledTable {...tableInstance.getTableProps()}>
                        <thead>
                            {tableInstance.headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                        >
                                            {column.render("Header")}
                                            <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <ArrowDropDown />
                                                    ) : (
                                                        <ArrowDropUp />
                                                    )
                                                ) : (
                                                    <FilterListOff
                                                        style={{
                                                            color: "rgba(0, 0, 0, 0.2)",
                                                            fontSize: "1rem",
                                                        }}
                                                    />
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...tableInstance.getTableBodyProps()}>
                            {tableInstance.page.map((row) => {
                                tableInstance.prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    onClick={() => {
                                                        if (
                                                            cell.column
                                                                .Header ===
                                                            "Del"
                                                        ) {
                                                            if (
                                                                window.confirm(
                                                                    "Are you sure you want to delete this user?"
                                                                )
                                                            ) {
                                                                deleteUser(
                                                                    cell.row
                                                                        .original
                                                                        .id
                                                                );
                                                            } else {
                                                                return;
                                                            }
                                                        } else if (
                                                            cell.column
                                                                .Header ===
                                                            "Info"
                                                        ) {
                                                            handleShowUserInfo();
                                                            getUserInfo(
                                                                cell.row
                                                                    .original
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {cell.render("Cell")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </StyledTable>
                </>
            )}
            <StyledPagination>
                <button
                    onClick={() => tableInstance.previousPage()}
                    disabled={!tableInstance.canPreviousPage}
                >
                    Previous
                </button>
                <button
                    onClick={() => tableInstance.nextPage()}
                    disabled={!tableInstance.canNextPage}
                >
                    Next
                </button>
                <span>
                    Page{" "}
                    <strong>
                        {tableInstance.state.pageIndex + 1} of{" "}
                        {tableInstance.pageOptions.length}
                    </strong>{" "}
                </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={tableInstance.state.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            tableInstance.gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span>{" "}
                <select
                    value={tableInstance.state.pageSize}
                    onChange={(e) => {
                        tableInstance.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </StyledPagination>
        </>
    );
};

const StyledTable = styled.table`
    border-spacing: 0;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    text-align: left;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 5 10px rgba(0, 0, 0, 0.1);
    padding: 20px;

    thead {
        background-color: transparent;
        color: #34a853;
        font-size: 18px;
        font-weight: 600;
    }

    th,
    td {
        padding: 10px 20px;
        border-bottom: 1px solid #ededed;
        border-right: 1px solid #ededed;
        // border-radius: 6.25px;

        &:last-child {
            border-right: none;
        }
    }

    tr {
        border-bottom: 1px solid #ededed;
        transition: all 0.3s ease;
        cursor: pointer;
        &:last-child {
            td {
                border-bottom: 0;
            }
        }

        &:hover {
            // rduce the brightness of the background color
            background-color: rgba(0, 0, 0, 0.05);
        }
    }

    tbody tr:nth-child(odd) {
        background-color: #f5f5f5;
    }

    .pagination {
        border: 2px solid green;
    }
`;

const StyledPagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0 20px;
    gap: 10px;

    span {
        margin: 0 10px;
    }

    button {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background-color: #34a853;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background-color: #2e7d32;
        }

        &:disabled {
            background-color: #c5e1a5;
            color: #fff;
            cursor: not-allowed;
        }

        &:first-child {
            //   margin-right: auto;
        }

        &:last-child {
            margin-left: auto;
        }

        &:disabled:first-child {
            background-color: #c5e1a5;
            color: #fff;
        }
    }

    input {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background-color: #fff;
        color: #000;
        text-align: center;
        font-size: 18px;
        font-weight: 600;

        &:focus {
            outline: none;
        }

        &:disabled {
            background-color: #c5e1a5;
            color: #fff;
            cursor: not-allowed;
        }
    }

    select {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background-color: #fff;
        color: #000;
        text-align: center;
        font-size: 18px;
        font-weight: 600;

        &:focus {
            outline: none;
        }
    }
`;
export default PaginationTable;
