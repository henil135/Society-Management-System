import React from "react";

import { Route, Routes} from "react-router-dom";
import ResidentManagement from "../component/Residentmanagement";
import Sidebar from "../component/Layout/Sidebar"; 
import ResidentForm from "../component/ResidentForm";
import FacilityManagement from "../component/FacilityManagement";
import CreateComplaint from "../component/CreateComplaint";
import RequestTracking from "../component/RequestTracking";
import VisitorsLogs from "../component/VisitorsLogs";
import SecurityProtocols from "../component/SecurityProtocols";

const Home = () => {
  return <div>
    <Sidebar/>
    <Routes>
      
      <Route path="/residentmanagement" element={<ResidentManagement/>}/>
      <Route path="/addresidents" element={<ResidentForm/>} />
      <Route path="/facility-management" element={<FacilityManagement/>}/>
      <Route path="/create-complaint" element={<CreateComplaint/>}/>
      <Route path="/request-tracking" element={<RequestTracking/>}/>
      <Route path="/visitors-log" element={<VisitorsLogs/>}/>
      <Route path="/security-protocols" element={<SecurityProtocols/>}/>



    </Routes>
  </div>;
};

export default Home;






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

