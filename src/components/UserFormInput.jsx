import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { bank_codes } from "../bankCodes";

const StyledUserFormInput = styled.div`
  display: flex;
  flex-direction: column;
  // margin-bottom: 0.6rem;

  // target the input with the type checkbox

  label {
    font-size: 0.8rem;
    margin-bottom: 0.1rem;
  }
  input {
    padding: 0.7rem;
    font-size: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  input:focus {
    outline: none;
    border: 2px solid #fdc800;
  }

  input:vaild {
    border: 2px solid #34a853;
  }

  input:placeholder {
    font-size: 0.8rem;
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
    display: none;
  }

  input[type="checkbox"] + label {
    display: inline;
    margin-bottom: 0;
  }

  input[type="checkbox"] + label::before {
    content: "";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }

  input[type="checkbox"]:checked + label::before {
    content: "✓";
    text-align: center;
    line-height: 1rem;
    color: #34a853;
    font-weight: 800;
  }

  input[type="checkbox"]:focus + label::before {
    outline: 1px solid #fbbc05;
  }

  input[type="checkbox"]:disabled + label::before {
    border-color: #34a853;
  }

  input[type="checkbox"]:disabled + label {
    color: #34a853;
  }

  input[type="checkbox"]:disabled:checked + label::before {
    content: "✓";
    text-align: center;
    line-height: 1rem;
    color: #34a853;
    font-weight: bold;
  }

  .terms {
    // width: 200%;
  }

  span {
    color: red;
    font-size: 0.8rem;
    display: none;
  }

  input:invalid[focused="true"] ~ span {
    display: block;
  }

  input:invalid[focused="true"] {
    border: 1px solid red;
  }
`;

const UserFormInput = ({
  label,
  onChange,
  id,
  errorMessage,
  className,
  loading,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocused = (e) => {
    setFocused(true);
  };

  useEffect(() => {
    if (focused) {
      setFocused(false);
    }
  }, [!loading]);

  return (
    <StyledUserFormInput>
      {inputProps.type === "checkbox" ? (
        <div className={className}>
          <div
            className="select"
            style={{
              width: "100%",
            }}
          ></div>

          <input {...inputProps} onChange={onChange} id={id} />
          <label htmlFor={id}>
            "Filling in your details, means you agree to provide your data and
            you’re with our{" "}
            <a href="https://www.google.com">Terms and Conditions</a>"
          </label>
        </div>
      ) : (
        <div>
          <label htmlFor={id}>{label}</label>
          <input
            {...inputProps}
            onChange={onChange}
            id={id}
            onBlur={handleFocused}
            focused={focused.toString()}
            // remove the invalid if the form is submitted
          />
          <span>
            <small>{errorMessage}</small>
          </span>
        </div>
      )}
    </StyledUserFormInput>
  );
};

export default UserFormInput;
