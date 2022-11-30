import React, { useState } from "react";
import styled from "styled-components";

const StyledUserProfileCard = styled.div`
  border-radius: 10px;
  padding: 20px;
  display: flex;
  // flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  background: rgba(255, 184, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 184, 0, 0.2);
  }

  // target even elements
  &:nth-child(even) {
    background-color: rgba(0, 255, 145, 0.1);

    &:hover {
      background-color: rgba(0, 255, 145, 0.2);
    }
  }

  .profile-card__body__info {
    // display: flex;
  }

  .profile-card__body__icon {
    color: #434343;
    cursor: pointer;
  }
`;

const UserProfileCard = ({ icon, title, value }) => {
  const [copied, setCopied] = useState(false);
  return (
    <StyledUserProfileCard>
      <div className="profile-card__body__info">
        <p>{title}</p>
        <h4>{value}</h4>
      </div>
      <div
        div
        className="profile-card__body__icon"
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
          alert("Copied to clipboard");
        }}
      >
        {icon}
      </div>
    </StyledUserProfileCard>
  );
};

export default UserProfileCard;
