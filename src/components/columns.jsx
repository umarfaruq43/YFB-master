import { Delete, OpenInNew } from "@mui/icons-material";
import { doc, documentId } from "firebase/firestore";
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
    Header: "F/N",
    accessor: "firstName",
  },

  {
    Header: "L/N",
    accessor: "lastName",
  },

  //   {
  //     Header: "Middle Name",
  //     accessor: "middleName",
  //   },

  {
    Header: "Tel",
    accessor: "telephone",
  },
  //   {
  //     Header: "Auth Channel",
  //     accessor: "AuthChannel",
  //   },

  {
    Header: "BVN",
    accessor: "BVN",
  },

  {
    Header: "Acct num",
    accessor: "accountNumber",
  },

  //   {
  //     Header: "Auth Code",
  //     accessor: "authCode",
  //   },

  {
    Header: "B/C",
    accessor: "bank",
  },

  // {
  //   Header: "Email",
  //   accessor: "email",
  // },
  {
    Header: "Info",
    accessor: "",
    //   check if cell is empty then render a button
    Cell: ({ row }) => {
      return row.original.info ? (
        <button className="info-btn">
          {/* <Link to={`/user/${row.original.id}`}> */}

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
      return (
        // addDelete(row)
        addDelete()
      );
    },
  },
];

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
