import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../component/Layout/Sidebar";
import Dashboard from "../component/Dashboard";
import FinancialManagementIncome from "../component/FinancialManagementIncome";
import FinancialManagementExp from "../component/FinancialManagementExp";
import FinancialManagementNote from "../component/FinancialManagementNote";
import Profile from "../component/Profile";
import EditProfile from "../component/EditProfile";
import FinancialManagementOtherIncome from "../component/FinancialManagementOtherIncome";

export default function Home() {
    return (
        <div style={{ marginLeft: '280px' }}>
            <Sidebar />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route path="/Financial-Maintenanace" element={<FinancialManagementIncome />} />
                <Route path="/Other-Income" element={<FinancialManagementOtherIncome />} />
                <Route path="/Expense" element={<FinancialManagementExp />} />
                <Route path="/Note" element={<FinancialManagementNote />} />
            </Routes>
        </div>
    )
}