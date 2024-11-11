import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaHome, FaTag, FaEye, FaEdit, FaPlus } from 'react-icons/fa'; // Using react-icons as placeholders
import Sidebar from '../component/Layout/Sidebar';
import '../style.css';
import Avtar from '../assets/Avatar.png';

export default function ResidentManagement() {
  const [residents, setResidents] = useState([
    { name: "Evelyn Harper", unit: 'A', Number: "1001", unitStatus: "Occupied", residentStatus: "Tenant", phoneNumber: "97587 85828", members: 1, vehicles: 2 },
    { name: "-", unit: "B", Number: "1002", unitStatus: "Vacate", residentStatus: "--", phoneNumber: "--", members: "-", vehicles: "-" },
  ]);

  const [selectedResident, setSelectedResident] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [unitStatus, setUnitStatus] = useState('');
  const [residentStatus, setResidentStatus] = useState('');
  const [residentName, setResidentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [members, setMembers] = useState(0);
  const [vehicles, setVehicles] = useState(0);

  const handleEdit = (resident) => {
    setSelectedResident(resident);
    setResidentName(resident.name);
    setPhoneNumber(resident.phoneNumber);
    setMembers(resident.members);
    setVehicles(resident.vehicles);
    setUnitStatus(resident.unitStatus);
    setResidentStatus(resident.residentStatus);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResident(null);
  };

  const handleSave = () => {
    const updatedResidentStatus = unitStatus === "Occupied" ? residentStatus : "--";
    setResidents(prevResidents =>
      prevResidents.map(r =>
        r === selectedResident
          ? { ...r, name: residentName, phoneNumber, members, vehicles, unitStatus, residentStatus: updatedResidentStatus }
          : r
      )
    );
    setShowModal(false);
  };

  const handleView = (resident) => {
    setSelectedResident(resident);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedResident(null);
  };

  const imageColumnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" style={{ width: "300px" }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1 p-4">
        <div className="container-fluid bg-white rounded shadow-sm p-4" style={{ marginTop: "70px" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <h4>Resident Tenant and Owner Details</h4>
            <Link to="/home/addresidents">
              <Button className="mainColor2 mt-3 mt-md-0 justify-content-center"><FaPlus
                style={{
                  fontSize: "18px",
                  borderRadius: "5px",
                  background: "rgba(255, 255, 255, 1)",
                  color: "#FE512E",
                  marginRight: "8px",
                }}
              />Add New Resident Details</Button>
            </Link>
          </div>

          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
            <table className="table striped hover responsive">
              <thead>
                <tr className="rmHead">
                  <th
                    className="text-start"
                    style={{
                      padding: "10px",
                      width: "200px",
                      background: "rgb(185, 198, 242)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "21px",
                      textAlign: "left",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                    }}
                  >
                    Full Name
                  </th>

                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Unit Number</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Unit Status</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Resident Status</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Phone Number</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "130px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Members</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "130px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Vehicle</th>
                  <th className="text-center" style={{
                    padding: "10px", width: "150px", background: "rgb(185, 198, 242)", fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((resident, index) => (
                  <tr key={index} className="align-middle">
                    <td className="px-3">
                      <div style={imageColumnStyle} className="text-center">
                        <img
                          src={Avtar}
                          alt="avatar"
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "36px",
                            border: "2px solid #F4F4F4",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "24px",
                            textAlign: "left",
                          }}
                        >
                          {resident.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "start", verticalAlign: "middle" }}>
                      <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                        {resident.unit}
                      </span>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
                        {resident.Number}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: resident.unitStatus === "Occupied" ? "#ECFFFF" :
                            resident.unitStatus === "Vacate" ? "#FFF6FF" : "#F6F8FB",
                          color: resident.unitStatus === "Occupied" ? "#14B8A6" :
                            resident.unitStatus === "Vacate" ? "#9333EA" : "#202224",
                        }}
                      >
                        {resident.unitStatus === 'Occupied' ? <span><FaHome />  Occupide</span> : (resident.unitStatus === 'Vacate' ? <span><FaTag />  Vacate</span> : <FaHome />)}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: resident.residentStatus === "Tenant" ? "#FFF1F8" :
                            resident.residentStatus === "Owner" ? "#F1F0FF" : "#F6F8FB",
                          color: resident.residentStatus === "Tenant" ? "#EC4899" :
                            resident.residentStatus === "Owner" ? "#4F46E5" : "#202224",
                        }}
                      >
                        {resident.residentStatus === "Tenant" ? <span><FaUser />  Tenant</span> : (resident.residentStatus === "Owner" ? <FaTag /> : "--")}
                      </span>
                    </td>
                    <td className="text-center px-3">{resident.phoneNumber}</td>
                    <td className="text-center">{resident.members}</td>
                    <td className="text-center">{resident.vehicles}</td>

                    <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaEdit className="text-success me-2" style={{ cursor: "pointer", width: "20px" }} onClick={() => handleEdit(resident)} />
                        <FaEye className="text-primary me-2" style={{ cursor: "pointer", width: "20px" }} onClick={() => handleView(resident)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View Modal */}
          <Modal show={showViewModal} onHide={handleCloseViewModal}>
            <Modal.Header closeButton>
              <Modal.Title>Resident Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Resident Details Content */}
              <div>
                <strong>Resident Name:</strong> {selectedResident?.name}
              </div>
              <div>
                <strong>Phone Number:</strong> {selectedResident?.phoneNumber}
              </div>
              <div>
                <strong>Unit Status:</strong> {selectedResident?.unitStatus}
              </div>
              <div>
                <strong>Resident Status:</strong> {selectedResident?.residentStatus}
              </div>
              <div>
                <strong>Members:</strong> {selectedResident?.members}
              </div>
              <div>
                <strong>Vehicles:</strong> {selectedResident?.vehicles}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseViewModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Resident Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Unit Status</Form.Label>
                  <div className="d-flex">
                    <div className="mr-3">
                      <Form.Check
                        inline
                        label="Occupied"
                        name="unitStatus"
                        value="Occupied"
                        checked={unitStatus === 'Occupied'}
                        onChange={(e) => {
                          setUnitStatus(e.target.value);
                          setResidentStatus("Tenant");
                        }}
                      />
                    </div>
                    <div className="mr-3">
                      <Form.Check
                        inline
                        label="Vacate"
                        name="unitStatus"
                        value="Vacate"
                        checked={unitStatus === 'Vacate'}
                        onChange={(e) => {
                          setUnitStatus(e.target.value);
                          setResidentStatus("--");
                        }}
                      />
                    </div>
                  </div>
                  <Form.Label>Resident Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Members</Form.Label>
                  <Form.Control
                    type="number"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Vehicles</Form.Label>
                  <Form.Control
                    type="number"
                    value={vehicles}
                    onChange={(e) => setVehicles(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
              <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    </div>
  );
}
