import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SellerDashboard from './SellerDashboard'
import BuyerDashboard from "./BuyerDashboard";
import Navbar from "./Navbar";


export default function App() {
  return (
    <div className="App">
      {/* <UserArea/> */}
      <Navbar/>
      <Router>
        <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/SellerDashboard" element={<SellerDashboard />} />
        <Route path="/BuyerDashboard" element={<BuyerDashboard />} />
         </Routes>
      </Router>
    </div>
  );
}
