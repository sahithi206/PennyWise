import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Signup />} />
        <Route  path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
     </BrowserRouter>
  );
}

export default App;
