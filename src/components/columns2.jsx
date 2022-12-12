import { Delete, DoNotDisturb, History } from "@mui/icons-material";
import styled from "styled-components";

const StyledButton = styled.button`
  transition: all 0.3s ease;
  &:hover {
    color: #344054 !important;
  }
`;

export const COLUMNS2 = [
  {
    Header: "Customer Id",
    accessor: "data.customerId",
  },

  {
    Header: "First name",
    accessor: "firstName",
  },

  {
    Header: "Last name",
    accessor: "lastName",
  },

  {
    Header: "Ref",
    accessor: "data.mandateReference",
  },

  {
    Header: "AuthCode",
    accessor: "data.authorisationCode",
  },

  {
    Header: "Stop Loan",
    accessor: "",
    Cell: ({ row }) => addIcons(<DoNotDisturb />),
  },

  {
    Header: "History",
    accessor: "",
    Cell: ({ row }) => addIcons(<History />),
  },

  {
    Header: "Del",
    accessor: "",
    Cell: ({ row }) => addIcons(<Delete />),
  },
];

const addIcons = (icon) => {
  return (
    <StyledButton
      onClick={() => {}}
      className="delete-btn"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        color: "#ccc",
        backgroundColor: "transparent",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {icon}
    </StyledButton>
  );
};
