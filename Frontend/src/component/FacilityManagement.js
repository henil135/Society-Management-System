import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "./Layout/Sidebar";

const FacilityCard = ({ title, date, description, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleIconClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4 position-relative">
      <Card className="shadow-sm h-100">
        <Card.Header
          className="text-white d-flex justify-content-between align-items-center"
          style={{ background: "#5678E9" }}
        >
          {title}
          <BsThreeDotsVertical onClick={handleIconClick} style={{ cursor: "pointer" }} />
        </Card.Header>
        <Card.Body>
          <p className="mb-1" style={{ fontSize: "12px", color: "gray" }}>
            <strong>Upcoming Schedule Service Date:</strong> {date}
          </p>
          <h5 className="card-title" style={{ fontSize: "15px", color: "gray" }}>
            Description
          </h5>
          <p className="card-text" style={{ fontSize: "13px" }}>{description}</p>
        </Card.Body>

        {/* Dropdown menu */}
        {showMenu && (
          <div
            className="position-absolute bg-white border rounded shadow-sm p-2"
            style={{
              top: "40px",
              right: "10px",
              zIndex: 10,
            }}
            onClick={() => setShowMenu(false)}
          >
            <div
              className="dropdown-item"
              onClick={onEdit}
              style={{ cursor: "pointer" }}
            >
              Edit
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([
    { title: "Parking Facilities", date: "01/07/2024", description: "Description here." },
    { title: "Community Center", date: "01/07/2024", description: "Description here." },
    { title: "Swimming Pool", date: "01/07/2024", description: "Description here." },
    { title: "Wi-Fi and Connectivity", date: "01/07/2024", description: "Description here." },
    { title: "Parking Facilities", date: "01/07/2024", description: "Description here." },
    
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [facilityData, setFacilityData] = useState({ title: "", date: "", description: "" });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFacilityData({ title: "", date: "", description: "" });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacilityData({ ...facilityData, [name]: value });
  };

  const handleSave = () => {
    if (isEditing) {
      // Update the existing facility
      const updatedFacilities = [...facilities];
      updatedFacilities[editIndex] = facilityData;
      setFacilities(updatedFacilities);
    } else {
      // Add new facility
      setFacilities([...facilities, facilityData]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setFacilityData(facilities[index]);
    setEditIndex(index);
    setIsEditing(true);
    handleShowModal();
  };

  return (
    <div className="d-flex flex-column flex-md-row ms-2" style={{ marginTop: "70px" }}>
      <div className="col-12 col-md-3 flex-shrink-0" style={{ maxWidth: "300px" }}>
        <Sidebar />
      </div>
      <div className="container mt-5 col-11">
        {/* Header and Create Facility Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Facility Management</h3>
          <Button className="text-white mainColor2" onClick={() => {
            setIsEditing(false);
            handleShowModal();
          }}>
            Create Facility
          </Button>
        </div>

        {/* Facility Cards */}
        <div className="row">
          {facilities.map((facility, index) => (
            <FacilityCard
              key={index}
              title={facility.title}
              date={facility.date}
              description={facility.description}
              onEdit={() => handleEdit(index)}
            />
          ))}
        </div>

        {/* Modal for Creating or Editing Facility */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Facility" : "Create Facility"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="facilityName">
                <Form.Label>Facility Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Name"
                  value={facilityData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="facilityDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter Description"
                  value={facilityData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="facilityDate" className="mt-3">
                <Form.Label>Schedule Service Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={facilityData.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default FacilityManagement;
