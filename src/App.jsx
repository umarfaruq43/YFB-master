import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { Routes, Route, useParams } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminSignupPage from "./pages/AdminSignUpPage";
import { dbContext } from "./context/context";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />}></Route>
      {/* create a route after dashboard for userId */}
      <Route path="/dashboard/:userId" element={<h1>User Data</h1>}></Route>

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
