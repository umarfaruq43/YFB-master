import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledUserSelect = styled.div``;
const UserFormSelect = ({ label, value, onChange, options, ...bankCode }) => {
  return (
    <StyledUserSelect>
      <label>{bankCode.bankCode}</label>
      <select value={value} onChange={onChange}>
        <option>Bank</option>
      </select>
    </StyledUserSelect>
  );
};

export default UserFormSelect;
