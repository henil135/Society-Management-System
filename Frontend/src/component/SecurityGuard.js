import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { FaCamera, FaClock, FaEdit, FaEye, FaFemale, FaImage, FaMale, FaMoon, FaPlus, FaSun, FaTrash, FaUpload } from 'react-icons/fa';
import Sidebar from '../component/Layout/Sidebar';
import Avtar from "../assets/Avatar.png";
import { LuImagePlus } from 'react-icons/lu';

export default function SecurityGaurd() {
  const [guards, setGuards] = useState([
    { id: 1, name: 'Brooklyn Simmons ', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
    { id: 2, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Female' },
    { id: 3, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Night', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
    { id: 4, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Day', date: '2024-11-28', time: '2:45 PM', gender: 'Female' },
    { id: 5, name: 'Brooklyn Simmons', phone: '94564 96321', shift: 'Night', date: '2024-11-28', time: '2:45 PM', gender: 'Male' },
  ]);

  // Function to add a new guard (for demo)


  // Function to handle button click and show how useEffect might be used
  useEffect(() => {
    console.log('Guard list updated', guards);
  }, [guards]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteGuard, setShowDeleteGuard] = useState(false);
  const [deleteGuardId, setDeleteGuardId] = useState(null);
  const [showViewGuard, setShowViewGuard] = useState(false);
  const [guardData, setGuardData] = useState({ title: "", description: "", date: "", time: "" });
  const [newGuard, setNewGuard] = useState({
    name: '',
    phone: '',
    shift: 'Day',
    date: '',
    time: '',
    gender: '',
    photo: null,
    aadhaar: null,
  });


  const handleShowDelete = (guardId) => {
    setDeleteGuardId(guardId);
    setShowDeleteGuard(true);
  };

  const handleShowView = (guard) => {
    setGuardData(guard);
    setShowViewGuard(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowViewGuard(false);
    setShowDeleteGuard(false); // Close the delete confirmation modal when handleClose is called

    setDeleteGuardId(null); // Clear the ID of the protocol to delete
  };

  const handleDelete = () => {
    setGuards((prevGuards) =>
      prevGuards.filter((guard) => guard.id !== deleteGuardId)
    );
    setDeleteGuardId(null); // Clear the ID of the protocol to delete
    setShowDeleteGuard(false); // Close the delete confirmation modal
  };


  const formatTime = (time) => {
    // If time is in HH:MM format, convert it to 12-hour format with AM/PM
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    // Convert AM/PM to uppercase
    const formattedTimeUpper = formattedTime.toUpperCase();

    setNewGuard({ ...newGuard, time: formattedTimeUpper });
  };


  const handleAddGuard = () => {
    if (newGuard.name && newGuard.phone && newGuard.shift && newGuard.date && newGuard.time && newGuard.gender) {
      setGuards([...guards, newGuard]); // Add the new guard to the guards array
      setShowModal(false); // Close the modal
    } else {
      alert("Please fill all the fields before adding the guard.");
    }
  };


  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    if (field === 'aadhaar' || field === 'photo') {
      reader.onloadend = () => {
        // Set preview for images in 'aadhaar' or 'photo' fields
        setNewGuard((prevState) => ({
          ...prevState,
          [field]: {
            file,
            preview: file.type.startsWith('image/') ? reader.result : null,
          },
        }));
      };

      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file); // Read as data URL for image preview
      } else {
        setNewGuard((prevState) => ({
          ...prevState,
          [field]: { file, preview: null }, // No preview for non-image files
        }));
      }
    } else {
      // For other fields, just store the file without preview
      setNewGuard((prevState) => ({
        ...prevState,
        [field]: file,
      }));
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0" style={{ width: "280px" }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1 p-4">
        <div className="container-fluid bg-white rounded shadow-sm p-4" style={{ marginTop: "70px" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Security Guard Details</h4>
            <Button className="btn mainColor2 d-flex align-items-center justify-content-center" onClick={() => setShowModal(true)}>
              <FaPlus
                style={{
                  fontSize: "18px",
                  borderRadius: "5px",
                  background: "rgba(255, 255, 255, 1)",
                  color: "#FE512E",
                  marginRight: "8px",
                }}
              />
              Add Security
            </Button>
          </div>


          <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff", padding: "20px", marginTop: "20px" }}>
            <Table striped responsive style={{ width: "1110px" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      width: "200px"
                    }}
                  >
                    Security Guard Name
                  </th>

                  <th style={{ fontSize: "15px" }} className='text-center'>Phone Number</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Select Shift</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Shift Date</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Shift Time</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Gender</th>
                  <th style={{ fontSize: "15px" }} className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {guards.map((guard, index) => (
                  <tr key={index}>
                    <td style={{ verticalAlign: "middle", width: "220px" }}>
                      <div >
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
                          {guard.name}
                        </span>
                      </div>
                    </td>
                    <td className='text-center' style={{ fontFamily: "Poppins", verticalAlign: "middle" }}>{guard.phone}</td>
                    <td className='text-center' style={{ verticalAlign: "middle" }}>
                      {guard.shift === 'Day' ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "113px",
                            height: "31px",
                            textAlign: "center",
                            fontFamily: "Poppins",
                            borderRadius: "50px",
                            background: "rgba(244, 244, 244, 1)",
                            color: "rgba(255, 147, 0, 1)", // Text and icon color
                            fontSize: "16px", // Optional for font size
                            fontWeight: "500", // Optional for font weight
                          }}
                          role="img"
                          aria-label="Day"
                        >
                          <FaSun style={{ marginRight: "5px" }} />
                          Day
                        </span>
                      ) : (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Poppins",
                            width: "113px",
                            height: "31px",
                            borderRadius: "50px",
                            background: "rgba(79, 79, 79, 1)",  // Dark background
                            color: "rgba(255, 255, 255, 1)",    // White text and icon color
                            fontSize: "16px",                   // Optional font size
                            fontWeight: "500",                  // Optional font weight
                          }}
                          role="img"
                          aria-label="Night"
                        >
                          <FaMoon style={{ marginRight: "5px" }} />
                          Night
                        </span>
                      )}
                    </td>
                    <td className='text-center' style={{ fontFamily: "Poppins", verticalAlign: "middle" }}>{guard.date}</td>
                    <td style={{ verticalAlign: "middle" }} className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <div
                          style={{
                            width: "100px",
                            height: "34px",
                            padding: "5px 15px",
                            gap: "10px",
                            fontFamily: "Poppins",
                            borderRadius: "50px",
                            background: "#F6F8FB",
                            color: "#4F4F4F",
                            display: "inline-block",
                          }}
                        >
                          {guard.time}
                        </div>
                      </div>
                    </td>
                    <td className='text-center' style={{ verticalAlign: "middle" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "113px",
                          height: "31px",
                          padding: "5px 12px",
                          gap: "5px",
                          borderRadius: "50px",
                          fontFamily: "Poppins",
                          background:
                            guard.gender === "Male" ? "rgba(33, 168, 228, 0.1)" : "rgba(254, 118, 168, 0.1)",
                          color:
                            guard.gender === "Male" ? "rgba(86, 120, 233, 1)" : "rgba(254, 118, 168, 1)",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {guard.gender === "Male" ? <FaMale /> : <FaFemale />}
                        {guard.gender}
                      </span>
                    </td>
                    <td className='text-center' style={{ verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <FaEdit className="text-success me-2" style={{ cursor: "pointer" }} />
                        <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowView(guard)} />
                        <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleShowDelete(guard.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Modal show={showViewGuard} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title  style={{
              width: "371px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>View Security Protocols</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div style={{
        width: "285px",
        height: "70px",
        display: "flex",
        textAlign: "start",
        gap: "15px",
        fontFamily: "Poppins, sans-serif",
      }}>
      
  <img
    src={Avtar}
    alt="avatar"
    style={{
      width: "70px",
      height: "70px",
      borderRadius: "50%", // Ensures a perfect circle
      border: "3px solid #F4F4F4",
    }}
  />
  
  <p style={{ margin: 0 }}>{guardData.name}<br/>{guardData.date}</p>
</div>

              
<div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Centers vertically
    width: "100%", // Adjusts width for space distribution
    fontFamily: "Poppins, sans-serif",
    marginTop:"20px"
  }}>
  
  <div style={{ 
    textAlign: "center", 
    display: "flex", 
    flexDirection: "column", // Stacks items vertically
    gap: "0px", // Removes any gap between elements
    alignItems: "center",
  }}>
  
  <span>Select Shift</span>
  
  {guardData.shift === 'Day' ? (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "113px",
        height: "31px",
        fontFamily: "Poppins",
        borderRadius: "50px",
        background: "rgba(244, 244, 244, 1)",
        color: "rgba(255, 147, 0, 1)", // Text and icon color
        fontSize: "16px", // Optional for font size
        fontWeight: "500", // Optional for font weight
      }}
      role="img"
      aria-label="Day"
    >
      <FaSun style={{ marginRight: "5px" }} />
      Day
    </span>
  ) : (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins",
        width: "113px",
        height: "31px",
        borderRadius: "50px",
        background: "rgba(79, 79, 79, 1)",  // Dark background
        color: "rgba(255, 255, 255, 1)",    // White text and icon color
        fontSize: "16px",                   // Optional font size
        fontWeight: "500",                  // Optional font weight
      }}
      role="img"
      aria-label="Night"
    >
      <FaMoon style={{ marginRight: "5px" }} />
      Night
    </span>
  )}
</div>

<div className=" align-items-center justify-content-center">
  <p className="mb-0 text-center">Shift Time</p>
  <div className='text-center'
    style={{
      width: "100px",
      height: "34px",
      padding: "5px 15px",
      fontWeight:"500",
      borderRadius: "50px",
      background: "#F6F8FB",
      color: "#4F4F4F",
      display: "inline-block",
    }}
  >
    {guardData.time}
  </div>
</div>

  
<div style={{ textAlign: "center" }}>
  <span style={{ display: "block", marginBottom: "0" }}>Gender</span>
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "113px",
      height: "31px",
      padding: "5px 12px",
      gap: "5px",
      borderRadius: "50px",
      fontFamily: "Poppins",
      background:
        guardData.gender === "Male" ? "rgba(33, 168, 228, 0.1)" : "rgba(254, 118, 168, 0.1)",
      color:
        guardData.gender === "Male" ? "rgba(86, 120, 233, 1)" : "rgba(254, 118, 168, 1)",
      fontSize: "16px",
      fontWeight: "500",
    }}
  >
    {guardData.gender === "Male" ? <FaMale /> : <FaFemale />}
    {guardData.gender}
  </span>
</div>

  
</div>

              </Modal.Body>

            </Modal>


            <Modal show={showDeleteGuard} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Delete Protocol?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this protocol?</p>
              </Modal.Body>
              <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="secondary" onClick={handleClose} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224", }}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} style={{
                  width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224", background: "rgba(231, 76, 60, 1)"
                }}>
                  Delete
                </Button>

              </Modal.Footer>
            </Modal>

            {/* Add Security Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Security</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Add Photo Section */}
                <div className="text-start" style={{ display: 'flex', marginBottom: '20px' }}>
                  <label htmlFor="photo-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div
                      style={{
                        display: 'flex',             // Use flex layout for the row
                        flexDirection: 'row',        // Align the image and text horizontally (side by side)
                        alignItems: 'center',        // Vertically center the content
                        justifyContent: 'center',    // Center the content horizontally
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "rgba(211, 211, 211, 1)",
                          overflow: "hidden",
                          display: "flex",             // Ensure flex layout for the circle
                          alignItems: "center",       // Center the image inside the circle
                          justifyContent: "center",   // Center the image inside the circle
                          border: "2px solid #ddd",
                          marginRight: "10px",        // Add some spacing between the image and text
                        }}
                      >
                        {newGuard.photo?.preview ? (
                          <img
                            src={newGuard.photo.preview}  // Access preview here
                            alt="Uploaded"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",        // Keep the circle shape
                            }}
                          />
                        ) : (
                          <div style={{
                            color: "rgba(255, 255, 255, 1)",
                            fontSize: "16px"
                          }}><FaCamera /></div>
                        )}
                      </div>
                      <div style={{ color: "#007bff" }}>Add Photo</div>
                    </div>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    onChange={(e) => handleFileChange(e, 'photo')}
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                  />
                </div>



                {/* Form Fields */}
                <Form>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full Name"
                      value={newGuard.name}
                      onChange={(e) => setNewGuard({ ...newGuard, name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="+91"
                      value={newGuard.phone}
                      onChange={(e) => setNewGuard({ ...newGuard, phone: e.target.value })}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-3">
                    {/* Gender field */}
                    <Form.Group controlId="formGender" style={{ width: "210px" }}>
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        value={newGuard.gender}
                        onChange={(e) => setNewGuard({ ...newGuard, gender: e.target.value })}
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </Form.Select>
                    </Form.Group>

                    {/* Shift field */}
                    <Form.Group controlId="formShift" style={{ width: "210px" }}>
                      <Form.Label>Shift</Form.Label>
                      <Form.Select
                        value={newGuard.shift}
                        onChange={(e) => setNewGuard({ ...newGuard, shift: e.target.value })}
                      >
                        <option>Select Shift</option>
                        <option>Day</option>
                        <option>Night</option>
                      </Form.Select>
                    </Form.Group>
                  </div>


                  <div className="d-flex mb-3" style={{ justifyContent: 'space-between' }}>
                    {/* Shift Date */}
                    <Form.Group controlId="formDate" style={{ width: "210px" }}>
                      <Form.Label>Shift Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={newGuard.date}
                        onChange={(e) => setNewGuard({ ...newGuard, date: e.target.value })}
                      />
                    </Form.Group>

                    {/* Shift Time */}
                    <Form.Group controlId="formTime" style={{ width: "210px" }} >
                      <Form.Label>Shift Time</Form.Label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Form.Control
                          type="text"
                          placeholder="HH:MM AM/PM"
                          value={newGuard.time}
                          onFocus={(e) => (e.target.type = 'time')}  // Change input type to 'time' on focus
                          onBlur={(e) => {
                            if (!e.target.value) e.target.type = 'text'; // Change back to 'text' if no value
                            else formatTime(e.target.value); // Apply time formatting
                          }}
                          onChange={(e) => setNewGuard({ ...newGuard, time: e.target.value })}
                          style={{ paddingLeft: '35px' }} // Padding to accommodate the icon
                        />
                        <FaClock style={{ position: 'absolute', left: '10px', color: '#007bff', pointerEvents: 'none' }} />
                      </div>
                    </Form.Group>

                  </div>


                  {/* Aadhaar Card Upload Section */}
                  <Form.Group controlId="formAadhaar" className=" mt-4">
                    <Form.Label>Upload Aadhaar Card</Form.Label>
                    <div className='text-center'
                      style={{
                        border: "2px dashed rgba(211, 211, 211, 1)",
                        borderRadius: "8px",
                        padding: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        cursor: "pointer"
                      }}
                    >
                      <label htmlFor="aadhaar-upload" style={{ cursor: 'pointer', color: '#007bff' }}>
                        <LuImagePlus className='text-center'
                          style={{
                            fontSize: '24px',      // Size of the icon
                            marginBottom: '8px',   // Bottom margin
                            width: '40px',         // Icon width
                            height: '50px',        // Icon height
                            top: '4px',            // Top offset
                            left: '8px',           // Left offset
                            color: " rgba(167, 167, 167, 1)",// Ensure position is relative to the container
                            gap: '0px',
                            // No gap between elementsr
                          }}
                        />

                        <div>Upload a file <span style={{ color: "black" }}>or drag and drop</span></div>
                      </label>
                      <small className="text-muted">PNG, JPG, GIF, PDF up to 10MB</small>
                      <input
                        id="aadhaar-upload"
                        type="file"
                        onChange={(e) => handleFileChange(e, 'aadhaar')}
                        accept="image/png, image/jpeg, application/pdf"
                        style={{ display: 'none' }}
                      />

                      {/* Display file preview or name */}
                      {newGuard.aadhaar && (
                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                          {newGuard.aadhaar.preview && newGuard.aadhaar.file.type.startsWith('image/') ? (
                            <img
                              src={newGuard.aadhaar.preview}
                              alt="Aadhaar Preview"
                              style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div>{newGuard.aadhaar.file.name}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="secondary"
                  style={{
                    width: "175px",
                    height: "51px",
                    border: "1px solid #202224",
                    padding: "10px 55px 10px 55px",
                    background: "#FFFFFF",
                    color: "#202224"
                  }}
                  onClick={() => setShowModal(false)} // Close modal when Cancel is clicked
                >
                  Cancel
                </Button>
                <Button
                  className="mainColor2"
                  style={{
                    width: "175px",
                    height: "51px",
                    border: "1px",
                    padding: "10px 55px 10px 55px",
                    color: "#202224"
                  }}
                  onClick={handleAddGuard} // Add new guard and close modal
                >
                  Create
                </Button>
              </Modal.Footer>

            </Modal>

          </div>
        </div>
      </div>
    </div>
  );
}