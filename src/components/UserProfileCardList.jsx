import React from "react";

const UserProfileCardList = (user) => {
  return (
    <>
      {/* use object map to get both values and index*/}
      {Object.entries(user).map(([key, value], index) => {
        return (
          <div key={index}>
            <p>{key}</p>
            <p>{value}</p>
          </div>
        );
      })}
    </>
  );
};

export default UserProfileCardList;
