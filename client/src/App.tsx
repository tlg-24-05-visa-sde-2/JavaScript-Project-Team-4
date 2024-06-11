import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Signup } from './pages/index';

function App(): React.ReactElement {

  console.log("production: ", process.env.REACT_APP_PRODUCTION)
  return (
    <Router>
    <ToastContainer theme="colored" autoClose={2000} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;
