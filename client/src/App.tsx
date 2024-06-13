import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home, Login, Signup, Payments, Profile } from "./pages/index";
import About from "./pages/About";
import UserService from "./utils/UserService";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";

function App(): React.ReactElement {
  const [userData, setUserData] = useState({});

  const fetchUserdata = async () => {
    const response = await UserService.fetchUserData();
    if (response.user) {
      setUserData(response.user);
    }
  };

  useEffect(() => {
    fetchUserdata();
  });

  return (
    <AuthProvider>
      <Router>
        <ToastContainer theme="colored" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payments/setup" element={<Payments />} />
          <Route path="/profile/*" element={<ProtectedRoute />}>
            <Route path="" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
