import {
  Delete,
  DoDisturb,
  DoDisturbAlt,
  DoNotDisturb,
  History,
  HistoryEduSharp,
  OpenInNew,
  Stop,
  StopCircle,
} from "@mui/icons-material";
import styled from "styled-components";

const StyledButton = styled.button`
  transition: all 0.3s ease;
  &:hover {
    color: #344054 !important;
  }
`;

export const COLUMNS2 = [
  {
    Header: "CuId",
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
    Header: "MRef",
    accessor: "'",
  },

  {
    Header: "AuthCode",
    accessor: "",
  },

  {
    Header: "SLCollection",
    accessor: "",
    Cell: ({ row }) => addIcons(<DoNotDisturb />),
  },

  {
    Header: "MHisotry",
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
