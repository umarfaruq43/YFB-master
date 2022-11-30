import React from "react";
import { useAuth } from "../context/context";
import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/signup" />;
  }
  return <div>{children}</div>;
};
