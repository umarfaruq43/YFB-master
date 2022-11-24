import React, { useContext, useMemo } from "react";
import { dbContext } from "../context/context";
import { COLUMNS } from "./columns";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import styled from "styled-components";
import GlobalFilter from "./GlobalFilter";
import { ArrowDropDown, ArrowDropUp, FilterList } from "@mui/icons-material";

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
`;

const SortingTable = () => {
  const { data: userData } = dbContext();
  console.log(userData);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => userData, [userData]);
  //   const data = useMemo(() => userData, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
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
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDropDown />
                      ) : (
                        <ArrowDropUp />
                      )
                    ) : (
                      <FilterList
                        style={{
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
          {tableInstance.rows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
};

export default SortingTable;
