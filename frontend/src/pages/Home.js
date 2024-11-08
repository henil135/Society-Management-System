import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../component/Layout/Sidebar";
import Dashboard from "../component/Dashboard";
import FinancialManagementIncome from "../component/FinancialManagementIncome";
import FinancialManagementExp from "../component/FinancialManagementExp";
import FinancialManagementNote from "../component/FinancialManagementNote";
import Profile from "../component/Profile";
import EditProfile from "../component/EditProfile";

export default function Home() {
    return (
        <div style={{ marginLeft: '280px' }}>
            <Sidebar />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route path="/income" element={<FinancialManagementIncome />} />
                <Route path="/expense" element={<FinancialManagementExp />} />
                <Route path="/note" element={<FinancialManagementNote />} />
            </Routes>
        </div>
    )
}