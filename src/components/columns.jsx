import { Delete, OpenInNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDelete } from "../context/context";

const StyledButton = styled.button`
  transition: all 0.3s ease;
  &:hover {
    color: #344054 !important;
  }
`;

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "number",
  },

  {
    Header: "First Name",
    accessor: "firstName",
    Cell: ({ row }) => linkToUser(row, "firstName"),
  },

  {
    Header: "Last Name",
    accessor: "lastName",
    Cell: ({ row }) => linkToUser(row, "lastName"),
  },

  {
    Header: "Telephone",
    accessor: "telephone",
    Cell: ({ row }) => linkToUser(row, "telephone"),
  },

  {
    Header: "BVN",
    accessor: "BVN",
    Cell: ({ row }) => linkToUser(row, "BVN"),
  },

  {
    Header: "Acc No",
    accessor: "accountNumber",
    Cell: ({ row }) => linkToUser(row, "accountNumber"),
  },

  {
    Header: "Bnk/C",
    accessor: "bank",
    Cell: ({ row }) => linkToUser(row, "bank"),
  },

  {
    Header: "Info",

    Cell: ({ row }) => {
      return row.original.info ? (
        <button className="info-btn">
          <OpenInNew />
        </button>
      ) : (
        <button
          className="info-btn"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            color: "#344054",
            backgroundColor: "transparent",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <OpenInNew style={{ color: "" }} />
        </button>
      );
    },
  },

  // Add a delete icon to remove a user
  {
    Header: "Del",
    accessor: "",
    Cell: ({ row }) => {
      return addDelete();
    },
  },
];

// add a delete icon to remove a user
const addDelete = () => {
  const { data, user, deleteDoc } = useDelete();
  // add the row from the table to the deleteDoc function
  // get the row from the table
  // const row = row;
  return (
    <StyledButton
      onClick={() => {
        // deleteDoc(doc(user, "users", documentId(row.original.id)));
      }}
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
      // delete the user of that row passing the email parameter
    >
      <Delete />
    </StyledButton>
  );
};

// create a link to the user's profile
function linkToUser(row, name) {
  return (
    <Link
      to={`/dashboard/${row.original.id}`}
      className="link"
      style={{
        color: "#475467",
        textDecoration: "none",
      }}
    >
      {row.original[name]}
    </Link>
  );
}
