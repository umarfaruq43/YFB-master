import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { Routes, Route, useParams } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminSignupPage from "./pages/AdminSignUpPage";
import { dbContext } from "./context/context";
import UserProfile from "./pages/UserProfile";
import TermsAndCondition from "./pages/TermsAndCondition";
import { Protected } from "./components/Protected";
import AppLogout from "./components/AppLogout";
import AdminDisbursementPage from "./pages/AdminDisbursementPage";

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
      <Route path="*" element={<div>404</div>}></Route>
      <Route path="/policy" element={<TermsAndCondition />}></Route>
      <Route path="/signup" element={<AdminSignupPage />} />
    </Routes>
  );
};

export default App;

// const UserInfo = () => {
//   const { userId } = useParams();
//   const { data, dataLoading } = dbContext();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { user: currentUser } = useAuth();

//   useEffect(() => {
//     if (!dataLoading) {
//       const user = data.find((user) => user.id === userId);
//       setUser(user);
//       setLoading(false);
//     }
//   }, [data, dataLoading, userId]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>User Info</h1>
//       <h2>{user.email}</h2>
//     </div>
//   );
// };
