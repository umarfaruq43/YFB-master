import "regenerator-runtime/runtime";

import { Clear, Search } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { useAsyncDebounce } from "react-table";

const StyledSearch = styled.div`

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
`;

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);

  const handleClearInput = () => {
    setValue("");
    setFilter(undefined);
  };

  return (
    <StyledSearch className="dashboard-search-container">
      <Search className="dashboard-search-icon" />{" "}
      <input
        type="search"
        placeholder="Search"
        className="dashboard-search"
        id="dashboard-search"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <Clear className="clear-icon" onClick={handleClearInput} />
    </StyledSearch>
  );
};

export default GlobalFilter;
