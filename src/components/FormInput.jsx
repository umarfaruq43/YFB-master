import React, { useRef } from "react";
import styled from "styled-components";

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 17px;
    color: #344054;
    margin-bottom: 0.1rem;
  }

  input {
    width: 100%;
    height: 40px;
    border: 1px solid #d0d5dd;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 16px;
    font-style: normal;
    font-size: 14px;
    line-height: 17px;
    color: #344054;

    &:focus {
      outline: none;
      border: 2px solid #fdc800;
    }

    &:valid {
      border: 2px solid #34a853;
    }

    &:placeholder {
      font-size: 14px;
      color: #344054;
    }

    &::placeholder {
      font-size: 14px;
      color: #344054;
    }
  }
`;

const FormInput = ({ label, onChange, id, errorMessage, ...inputProps }) => {
  return (
    <StyledFormInput>
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} onChange={onChange} id={id} />
    </StyledFormInput>
  );
};

export default FormInput;
