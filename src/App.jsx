import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { Routes, Route, useParams } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminSignupPage from "./pages/AdminSignUpPage";
import { dbContext } from "./context/context";
import UserProfile from "./pages/UserProfile";
import { Protected } from "./components/Protected";
import AppLogout from "./components/AppLogout";
import AdminDisbursementPage from "./pages/AdminDisbursementPage";
import ApprovedPage from "./pages/ApprovedPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <AppLogout>
              <Dashboard />
            </AppLogout>
          </Protected>
        }
      />

      <Route
        path="/dashboard/:userId"
        element={
          <Protected>
            <AppLogout>
              <UserProfile />
            </AppLogout>
          </Protected>
        }
      ></Route>

      <Route
        path="/admin"
        element={
          <Protected>
            <AdminDisbursementPage />
          </Protected>
        }
      />

      <Route
        path="/approved"
        element={
          <Protected>
            <ApprovedPage />
          </Protected>
        }
      />
      <Route path="*" element={<div>404</div>}></Route>
      <Route path="/signup" element={<AdminSignupPage />} />
    </Routes>
  );
};

export default App;
