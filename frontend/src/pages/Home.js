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





