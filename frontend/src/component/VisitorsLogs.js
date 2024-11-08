import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Sidebar from '../component/Layout/Sidebar';
import Avtar from "../assets/Avatar.png"

export default function DetailTracking() {
  const [details, setDetails] = useState([
    { id: 1, name: "Evelyn Harper", phoneNumber:"9313876347",date:"20/02/2002", unit: "A", number: "1001", time:"3:45 PM"  },
    { id: 2, name: "Esther Howard",  phoneNumber:"9313876347",date:"20/02/2002",  unit: "B", number: "1002", time:"3:45 PM"  },
  ]);

  
  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" style={{ width: "280px" }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1 p-4">
        <div className="container-fluid bg-white rounded shadow-sm p-4" style={{ marginTop: "70px" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Detail Tracking</h4>
          </div>

          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
            <Table striped hover responsive className="mt-3" style={{ width: "1100px" }}>
              <thead className="bg-light">
                <tr className="rmHead">
                  <th className="text-start" >visitor Name</th>
                  <th className="text-center" >Phone Number</th>
                  <th className="text-center" >Date</th>
                  <th className="text-center" >Unit Number</th>
                  <th className="text-center" >Time</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail) => (
                  <tr key={detail.id}>
                    <td >
                      <div  className="text-center">
                       
                        <span
                          
                        >
                          {detail.name}
                        </span>
                      </div>
                    </td>

                    <td >{detail.phoneNumber}</td>
                    <td >{detail.date}</td>
                    <td >{detail.unit} {detail.number}</td>
                    <td >{detail.time}</td>
            
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      
    </div>
  );
}
