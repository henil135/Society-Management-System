import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import Sidebar from '../component/Layout/Sidebar';
import Avtar from "../assets/Avatar.png"

export default function RequestTracking() {
  const [requests, setRequests] = useState([
    { id: 1, name: "Evelyn Harper", type: "Unethical Behavior", description: "Providing false information or",date:"20/10/2002", unit: "A", number: "1001", priority: "Medium", status: "Pending" },
    { id: 2, name: "Esther Howard", type: "Preventive Measures", description: "Regular waste collection services",date:"20/10/2002", unit: "B", number: "1002", priority: "High", status: "Solve" },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // New state for the "Create Request" feature
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    name: "",
    type: "",
    description: "",
    date:"",
    unit: "",
    number: "",
    priority: "Medium",
    status: "Open",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const handleEdit = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    if (!selectedRequest.name || !selectedRequest.type || !selectedRequest.description || !selectedRequest.date || !selectedRequest.unit || !selectedRequest.number) {
      setErrorMessage("All fields are required.");
      return;
    }
    
    setRequests((prevRequests) =>
      prevRequests.map((r) =>
        r.id === selectedRequest.id ? selectedRequest : r
      )
    );
  
    setShowModal(false);
    setErrorMessage("");
  };
  
  const handleView = (request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const getPriorityByStatus = (status) => {
    if (status === "Pending") return "Medium";
    if (status === "Open") return "Low";
    if (status === "Solve") return "High";
    return "Medium";
  };

  const badgeStyle = (priority) => {
    if (priority === "High") return { backgroundColor: "#E74C3C", color: "white" };
    if (priority === "Medium") return { backgroundColor: "#5678E9", color: "white" };
    if (priority === "Low") return { backgroundColor: "#39973D", color: "white" };
    return { backgroundColor: "#28a745", color: "white" };
  };

  const statusBadgeStyle = (status) => {
    if (status === "Pending") return { backgroundColor: " #FFC3131A", color: "#FFC313" };
    if (status === "Open") return { backgroundColor: "#5678E91A", color: "#5678E9" };
    if (status === "Solve") return { backgroundColor: "#39973D1A", color: "#39973D" };
    return { backgroundColor: "#f8f9fa", color: "black" };
  };

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleCreateRequest = () => {
    // Basic form validation
    if (!newRequest.name || !newRequest.type || !newRequest.description ||!newRequest.date || !newRequest.unit || !newRequest.number) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Validate and set priority based on status
    let priority = newRequest.priority;

    if (newRequest.status === "Pending" && priority !== "Medium") {
      setErrorMessage("Priority must be Medium when status is Pending.");
      return;
    }

    if (newRequest.status === "Open" && priority !== "Low") {
      setErrorMessage("Priority must be Low when status is Open.");
      return;
    }

    if (newRequest.status === "Solve" && priority !== "High") {
      setErrorMessage("Priority must be High when status is Solve.");
      return;
    }

    setErrorMessage(""); // Clear previous error message if any

    const newId = requests.length + 1;  // Auto-generate a new ID
    const requestToAdd = { ...newRequest, id: newId };
    setRequests([...requests, requestToAdd]);

    setNewRequest({ name: "", type: "", description: "",date: "", unit: "", number: "", priority: "Medium", status: "Open" });
    setShowCreateModal(false);
  };

  useEffect(() => {
    // Automatically update status based on priority
    if (newRequest.priority === "High") {
      setNewRequest(prev => ({ ...prev, status: "Solve" }));
    } else if (newRequest.priority === "Medium") {
      setNewRequest(prev => ({ ...prev, status: "Pending" }));
    } else if (newRequest.priority === "Low") {
      setNewRequest(prev => ({ ...prev, status: "Open" }));
    }
  }, [newRequest.priority]); // Trigger this effect whenever priority changes

  useEffect(() => {
    if (selectedRequest) {
      const newStatus =
        selectedRequest.priority === "High"
          ? "Solve"
          : selectedRequest.priority === "Medium"
          ? "Pending"
          : "Open";
      setSelectedRequest((prev) => ({ ...prev, status: newStatus }));
    }
  }, [selectedRequest?.priority]);

  const imageColumnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
  };
  const tableColumnStyle = {
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    maxWidth: "350px",
  };

  const handleDelete = (id) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };


  return (
    <div className="d-flex flex-column flex-md-row">
  <div className="flex-shrink-0" style={{ width: "280px" }}>
    <Sidebar />
  </div>

  <div className="flex-grow-1 p-4">
    <div className="container-fluid bg-white rounded shadow-sm p-2" style={{ marginTop: "70px" }}>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Request Tracking</h4>
        <Button className="btn mainColor2 d-flex align-items-center justify-content-center" onClick={handleShowCreateModal}>
        <FaPlus
    style={{
      fontSize: "18px",
      borderRadius: "5px",
      background: "rgba(255, 255, 255, 1)",
      color: "#FE512E",
      marginRight: "8px",
    }}
  />Create Request</Button>
      </div>

      <div className="table-responsive" style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)", overflow: "hidden", backgroundColor: "#fff",padding:"5px", marginTop: "20px" }}>
        <Table striped hover responsive className="mt-4" style={{ width: "100%" }}>
          <thead className="bg-light">
            <tr className="rmHead ">
              <th className="text-start" style={{ padding: "5px",fontSize:"14px",paddingLeft:"20px",background:"rgb(185, 198, 242)"}}>Requester Name</th>
              <th className="text-center" style={{ padding: "5px",fontSize:"14px",background:"rgb(185, 198, 242)" }}>Request Name</th>
              <th className="text-center" style={{ padding: "5px",fontSize:"14px",background:"rgb(185, 198, 242)" }}>Description</th>
              <th className="text-center" style={{ padding: "5px",fontSize:"14px",background:"rgb(185, 198, 242)" }}>Request Date</th>
              <th className="text-center" style={{ padding: "5px",fontSize:"14px",background:"rgb(185, 198, 242)" }}>Unit Number</th>
              <th className="text-center" style={{ padding: "5px",fontSize:"14px",background:"rgb(185, 198, 242)" }}>Priority</th>
              <th className="text-center" style={{ padding: "5px",fontSize:"14px",background:"rgb(185, 198, 242)" }}>Status</th>
              <th className="text-center" style={{ padding: "5px",fontSize:"14px",background:"rgb(185, 198, 242)" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td style={tableColumnStyle}>
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
                      {request.name}
                    </span>
                  </div>
                </td>

                <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }} className="text-start">
                  {request.type}
                </td>
                <td style={{
                  ...tableColumnStyle,
                width:"200px",
                  height: "24px",
                  top: "21px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  textAlign: "left",
                }}>
                  {request.description}
                </td>
                  
                <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle",width:"150px"}} className="text-center">
                  {request.date}
                </td>
                <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle"}}>
                  <span style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
                    {request.unit}
                  </span>
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: "500", fontSize: "16px", lineHeight: "24px", marginLeft: "8px" }}>
                    {request.number}
                  </span>
                </td>
                <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                  <span className="badge" style={{ ...badgeStyle(request.priority), width: "100px", height: "31px", padding: "5px 12px", gap: "8px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                    {request.priority}
                  </span>
                </td>
                <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                  <span style={{ ...statusBadgeStyle(request.status), width: "113px", height: "31px", padding: "5px 12px", gap: "5px", borderRadius: "50px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                    {request.status}
                  </span>
                </td>
                <td style={{ padding: "15px", textAlign: "center", verticalAlign: "middle" }}>
                  <div className="d-flex align-items-center justify-content-center">
                    <FaEdit className="text-success me-2" style={{ cursor: "pointer" }} onClick={() => handleEdit(request)} />
                    <FaEye className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleView(request)} />
                    <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(request.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  </div>



      {/* Create Complaint Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
  <Modal.Header closeButton>
    <Modal.Title>Create Request</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {errorMessage && (
      <div className="alert alert-danger">{errorMessage}</div>
    )}
    <Form>
      <Form.Group>
        <Form.Label>Requester Name</Form.Label>
        <Form.Control
          type="text"
          value={newRequest.name}
          onChange={(e) => setNewRequest({ ...newRequest, name: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Request Type</Form.Label>
        <Form.Control
          type="text"
          value={newRequest.type}
          onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={newRequest.description}
          onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
        />
       <Form.Group>
        <Form.Label>Request Date</Form.Label>
        <Form.Control
          type="text"
          value={newRequest.date}
          onChange={(e) => setNewRequest({ ...newRequest, date: e.target.value })}
        />
      </Form.Group>
        <Form>
          <Form.Group>
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="text"
              value={newRequest.unit}
              onChange={(e) => setNewRequest({ ...newRequest, unit: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              value={newRequest.number}
              onChange={(e) => setNewRequest({ ...newRequest, number: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <div className="d-flex justify-content-around">
          <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
            <Form.Check
              type="radio"
              label="High"
              name="priority"
              value="High"
              checked={newRequest.priority === "High"}
              onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
            />
          </div>
          <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
            <Form.Check
              type="radio"
              label="Medium"
              name="priority"
              value="Medium"
              checked={newRequest.priority === "Medium"}
              onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
            />
          </div>
          <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
            <Form.Check
              type="radio"
              label="Low"
              name="priority"
              value="Low"
              checked={newRequest.priority === "Low"}
              onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
            />
          </div>
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Status</Form.Label>
        <div className="d-flex justify-content-around">
          <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
            <Form.Check
              type="radio"
              label="Open"
              name="status"
              value="Open"
              checked={newRequest.status === "Open"}
              onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
            />
          </div>
          <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
            <Form.Check
              type="radio"
              label="Pending"
              name="status"
              value="Pending"
              checked={newRequest.status === "Pending"}
              onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
            />
          </div>
          <div style={{ width: "113px", height: "41px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px", paddingTop: "10px", paddingRight: "15px", paddingBottom: "10px", paddingLeft: "15px" }}>
            <Form.Check
              type="radio"
              label="Solved"
              name="status"
              value="Solved"
              checked={newRequest.status === "Solved"}
              onChange={(e) => setNewRequest({ ...newRequest, status: e.target.value })}
            />
          </div>
        </div>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
    <Button variant="secondary" onClick={handleCloseCreateModal} style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px 10px 55px", background: "#FFFFFF", color: "#202224" }}>
      Cancel
    </Button>
    <Button className="mainColor2" onClick={handleCreateRequest} style={{
      width: "175px", height: "51px", border: "1px", padding: "10px 55px 10px 55px", color: "#202224"
    }}>
      Create
    </Button>
  </Modal.Footer>
</Modal>


<Modal
  show={showViewModal}
  onHide={handleCloseViewModal}
  style={{
    width: "410px",
    left: "755px",
    padding: "20px 0px 0px 0px",
    borderRadius: "15px 0px 0px 0px",
  }}
>
  <Modal.Header closeButton>
    <Modal.Title
      style={{
        width: "371px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      View Request
    </Modal.Title>
  </Modal.Header>
  <Modal.Body
    style={{
      width: "371px",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      fontFamily: "Poppins, sans-serif",
    }}
  >
    {selectedRequest && (
      <div>
        <div style={{
          width: "285px",
          height: "70px",
          display: "flex",
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
          <div
            style={{
              height: "70px",
              gap: "0px",
              marginTop: "10px"
            }}
          >
            <h5 style={{ margin: 0 }}>{selectedRequest.name}</h5>
            <span style={{
              color: "#A7A7A7",
            }}>Aug 5, 2024</span>
          </div>
        </div>

        <div style={{
          height: "51px",
          gap: "3px",
          marginTop: "15px",
        }}>
          <strong style={{
            color: "#A7A7A7",
            fontWeight:"200"
          }}>Request Name</strong> <br />
          <span>{selectedRequest.type}</span>
        </div>
        <div style={{
          height: "75px",
          gap: "3px",
          marginTop: "15px",
        }}>
          <strong style={{
            color: "#A7A7A7",
            fontWeight:"200"
          }}>Description</strong>
          <p style={{ margin: 0 }}>{selectedRequest.description}</p>
        </div>

        <div style={{
          height: "51px",
          gap: "3px",
          
        }}>
          <strong style={{
            color: "#A7A7A7",
            fontWeight:"200"
          }}>Request Date</strong> <br />
          <span>{selectedRequest.date}</span>
        </div>

        <div
          className="d-flex"
          style={{
            width: "370.25px",
            gap: "10px",
            justifyContent: "space-around",
            marginTop:"20px"
          }}
        >
          <div style={{
            width: "41px",
            height: "55px",
            top: "166px",
            gap: "3px",
          }}>
            <strong
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "#A7A7A7"
              }}
            >
              Wing
            </strong>

            <p style={{ border: "1px solid ", borderRadius: "50%", width: "28px", height: "28px", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "skyblue" }}>
              {selectedRequest.unit}
            </p>
          </div>

          <div
            style={{
              width: "35px",
              height: "51px",
              top: "168px",
              left: "89.25px",
              gap: "3px",
              textAlign: "center"
            }}
          >
            <strong style={{
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "#A7A7A7"
            }}>Unit</strong>
            <p
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                color: "#202224",
                width: "35px",
                height: "24px",
                margin: "0"
              }}
            >
              {selectedRequest.number}
            </p>
          </div>

          <div
            style={{
              width: "86px",
              height: "55px",
              top: "166px",
              left: "172.25px",
              gap: "3px",
              textAlign: "center",
            }}
          >
            <strong style={{
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "#A7A7A7",
            }}>Priority</strong>
            <p
              style={{
                textAlign: "center",
                borderRadius: "50px",
                background: badgeStyle(selectedRequest.priority).backgroundColor,
                color: "white"
              }}
            >
              {selectedRequest.priority}
            </p>
          </div>

          <div style={{
            gap: "3px",
            textAlign: "center",
          }} >
            <strong style={{
              fontFamily: "Poppins",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "#A7A7A7"
            }}>Status</strong>
            <p
              style={{
                textAlign: "center",
                padding: "2px 10px",
                borderRadius: "50px",
                backgroundColor: statusBadgeStyle(selectedRequest.status).backgroundColor,
                color: statusBadgeStyle(selectedRequest.status).color
              }}
            >
              {selectedRequest.status}
            </p>
          </div>
        </div>
      </div>
    )}
  </Modal.Body>
</Modal>


      {/* edit model */}

      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Request</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {errorMessage && (
      <div className="alert alert-danger">{errorMessage}</div>
    )}
    <Form>
      <Form.Group>
        <Form.Label>Requester Name</Form.Label>
        <Form.Control
          type="text"
          value={selectedRequest?.name || ""}
          onChange={(e) =>
            setSelectedRequest((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Request Type</Form.Label>
        <Form.Control
          type="text"
          value={selectedRequest?.type || ""}
          onChange={(e) =>
            setSelectedRequest((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={selectedRequest?.description || ""}
          onChange={(e) =>
            setSelectedRequest((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Request Date</Form.Label>
        <Form.Control
          type="text"
          value={selectedRequest?.date || ""}
          onChange={(e) =>
            setSelectedRequest((prev) => ({
              ...prev,
              date: e.target.value,
            }))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Unit</Form.Label>
        <Form.Control
          type="text"
          value={selectedRequest?.unit || ""}
          onChange={(e) =>
            setSelectedRequest((prev) => ({
              ...prev,
              unit: e.target.value,
            }))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          value={selectedRequest?.number || ""}
          onChange={(e) =>
            setSelectedRequest((prev) => ({
              ...prev,
              number: e.target.value,
            }))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <div className="d-flex justify-content-around">
          {["High", "Medium", "Low"].map((priority) => (
            <Form.Check
              type="radio"
              label={priority}
              name="priority"
              value={priority}
              checked={selectedRequest?.priority === priority}
              onChange={(e) =>
                setSelectedRequest((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }))
              }
              key={priority}
            />
          ))}
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <div className="d-flex justify-content-around">
          {["Open", "Pending", "Resolved"].map((status) => (
            <Form.Check
              type="radio"
              label={status}
              name="status"
              value={status}
              checked={selectedRequest?.status === status}
              onChange={(e) =>
                setSelectedRequest((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              key={status}
            />
          ))}
        </div>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
    <Button style={{ width: "175px", height: "51px", border: "1px solid #202224", padding: "10px 55px", background: "#FFFFFF", color: "#202224" }} variant="secondary" onClick={handleCloseModal}>
      Cancel
    </Button>
    <Button style={{ width: "175px", height: "51px", padding: "10px 55px", color: "#202224" }} className="mainColor2" onClick={handleSave}>
      Save 
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}