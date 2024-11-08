import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";


import Logo from "../Logo";

import {
  FaTh,
  FaUser,
  FaDollarSign,
  FaBuilding,
  FaExclamationCircle,
  FaShieldAlt,
  FaBullhorn,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  const [isComplaintDropdownOpen, setComplaintDropdownOpen] = useState(false);
  const [isSecurityDropdownOpen, setSecurityDropdownOpen] = useState(false);
  const [isFinancialDropdownOpen, setFinancialDropdownOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard"; // Extract the part after "/home/"
    setActiveItem(path);

    // Open relevant dropdown based on the path
    if (path === "create-complaint" || path === "request-tracking") {
      setComplaintDropdownOpen(true);
      setSecurityDropdownOpen(false); // Close Security Management dropdown
      setFinancialDropdownOpen(false); // Close Financial Management dropdown
    } else if (path === "visitors-log" || path === "security-protocols") {
      setSecurityDropdownOpen(true);
      setComplaintDropdownOpen(false); // Close Complaint Tracking dropdown
      setFinancialDropdownOpen(false); // Close Financial Management dropdown
    } else if (path === "financialmanagement") {
      setFinancialDropdownOpen(true);
      setComplaintDropdownOpen(false); // Close Complaint Tracking dropdown
      setSecurityDropdownOpen(false); // Close Security Management dropdown
    } else {
      // Close all dropdowns for other paths
      setComplaintDropdownOpen(false);
      setSecurityDropdownOpen(false);
      setFinancialDropdownOpen(false);
    }
  }, [location]);

  const handleComplaintClick = () => {
    setComplaintDropdownOpen(!isComplaintDropdownOpen);
    setSecurityDropdownOpen(false); // Close Security Management dropdown
    setFinancialDropdownOpen(false); // Close Financial Management dropdown
    setActiveItem("complaint-tracking");
  };

  const handleSecurityClick = () => {
    setSecurityDropdownOpen(!isSecurityDropdownOpen);
    setComplaintDropdownOpen(false); // Close Complaint Tracking dropdown
    setFinancialDropdownOpen(false); // Close Financial Management dropdown
    setActiveItem("security-management");
  };

  const handleFinancialClick = () => {
    setFinancialDropdownOpen(!isFinancialDropdownOpen);
    setComplaintDropdownOpen(false); // Close Complaint Tracking dropdown
    setSecurityDropdownOpen(false); // Close Security Management dropdown
    setActiveItem("financialmanagement");
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FaTh />, path: "/home/dashboard" },
    { key: "residentmanagement", label: "Resident Management", icon: <FaUser />, path: "/home/residentmanagement" },
    { key: "financialmanagement", label: "Financial Management", icon: <FaDollarSign />, path: "/home/financialmanagement" },

  const [dropdownStates, setDropdownStates] = useState({
    financial: false,
    complaint: false,
  });

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard";
    setActiveItem(path);

    // Open the dropdown if the current path belongs to a dropdown category
    setDropdownStates({
      financial: ["income", "expense", "note"].includes(path),
      complaint: ["create-complaint", "request-tracking"].includes(path),
    });
  }, [location]);

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FaTh />, path: "/home/dashboard" },
    { key: "residentmanagement", label: "Resident Management", icon: <FaUser />, path: "/home/residentmanagement" },
    {
      key: "financialmanagement",
      label: "Financial Management",
      icon: <FaDollarSign />,
      subItems: [
        // { key: "maintenance", label: "Maintenance", path: "/home/maintenance" },
        { key: "income", label: "Income", path: "/home/income" },
        { key: "expense", label: "Expense", path: "/home/expense" },
        { key: "note", label: "Note", path: "/home/note" },
      ],
    },

    { key: "facility-management", label: "Facility Management", icon: <FaBuilding />, path: "/home/facility-management" },
    {
      key: "complaint-tracking",
      label: "Complaint Tracking",
      icon: <FaExclamationCircle />,
      subItems: [
        { key: "create-complaint", label: "Create Complaint", path: "/home/create-complaint" },
        { key: "request-tracking", label: "Request Tracking", path: "/home/request-tracking" },
      ],
    },

    {
      key: "security-management",
      label: "Security Management",
      icon: <FaShieldAlt />,
      subItems: [
        { key: "visitors-log", label: "Visitors Log", path: "/home/visitors-log" },
        { key: "security-protocols", label: "Security Protocols", path: "/home/security-protocols" },
      ],
    },

    { key: "security-management", label: "Security Management", icon: <FaShieldAlt />, path: "/home/security-management" },

    { key: "security-guard", label: "Security Guard", icon: <FaShieldAlt />, path: "/home/security-guard" },
    { key: "announcement", label: "Announcement", icon: <FaBullhorn />, path: "/home/announcement" },
  ];



  const toggleDropdown = (dropdownKey) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [dropdownKey]: !prevStates[dropdownKey],
    }));
  };


  return (
    <div className="sidebar">
      <div
        className="offcanvas offcanvas-start show"
        tabIndex="-1"
        style={{ visibility: "visible", width: "280px" }}
        aria-labelledby="offcanvasExampleLabel"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header justify-content-center">

          <h1 className="offcanvas-title mainColor mx-5" id="offcanvasExampleLabel">
            Dash<span className="text-dark">Stack</span>
          </h1>
        </div>

          <Logo />
        </div>


        <hr />

        <div className="offcanvas-body p-0">
          <ul className="list-unstyled">
            {menuItems.map((item) =>
              item.subItems ? (
                <li key={item.key} className="p-3 rounded">
                  <div
                    className={`d-flex align-items-center justify-content-between ${
                      activeItem === item.key ? "mainColor2 text-white" : ""
                    }`}
                    style={{
                      cursor: "pointer",

                      color: activeItem === item.key ? "white" : "black",
                    }}
                    onClick={() => {
                      if (item.key === "complaint-tracking") {
                        handleComplaintClick();
                      } else if (item.key === "security-management") {
                        handleSecurityClick();
                      } else if (item.key === "financialmanagement") {
                        handleFinancialClick();
                      }
                    }}

                      background: activeItem === item.key ? "linear-gradient(to right, #f79533, #f37055)" : "transparent",
                      color: activeItem === item.key ? "white" : "black",
                    }}
                    onClick={() => toggleDropdown(item.key === "financialmanagement" ? "financial" : "complaint")}

                  >
                    <div className="d-flex align-items-center">
                      {item.icon}
                      <span className="ms-3">{item.label}</span>
                    </div>

                    {item.key === "complaint-tracking" && (isComplaintDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                    {item.key === "security-management" && (isSecurityDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                    {item.key === "financialmanagement" && (isFinancialDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  </div>
                  {(item.key === "complaint-tracking" && isComplaintDropdownOpen) ||
                  (item.key === "security-management" && isSecurityDropdownOpen) ||
                  (item.key === "financialmanagement" && isFinancialDropdownOpen) ? (

                    {dropdownStates[item.key === "financialmanagement" ? "financial" : "complaint"] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {dropdownStates[item.key === "financialmanagement" ? "financial" : "complaint"] && (

                    <ul className="list-unstyled ms-4">
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem.key}

                          className={`p-2 rounded ${
                            activeItem === subItem.key ? "mainColor2 text-white" : ""
                          }`}
                          onClick={() => setActiveItem(subItem.key)}

                          className={`p-2 rounded ${activeItem === subItem.key ? "mainColor2 text-white" : ""}`}
                          onClick={() => setActiveItem(subItem.key)}
                          style={{
                            background: activeItem === subItem.key ? "linear-gradient(to right, #f79533, #f37055)" : "transparent",
                          }}

                        >
                          <Link
                            to={subItem.path}
                            className="d-flex align-items-center"
                            style={{
                              textDecoration: "none",
                              color: activeItem === subItem.key ? "white" : "black",
                            }}
                          >
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                  ) : null}

                  )}

                </li>
              ) : (
                <li key={item.key} className={`p-3 rounded ${activeItem === item.key ? "mainColor2" : ""}`}>
                  <Link
                    to={item.path}
                    className="d-flex align-items-center"

                    style={{ textDecoration: "none", color: activeItem === item.key ? "white" : "black" }}

                    style={{
                      textDecoration: "none",
                      color: activeItem === item.key ? "white" : "black",
                      background: activeItem === item.key ? "linear-gradient(to right, #f79533, #f37055)" : "transparent",
                    }}

                    onClick={() => setActiveItem(item.key)}
                  >
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>




        <hr />

        <div className="p-3">
          <Link to="/" className="d-flex align-items-center text-danger" style={{ textDecoration: "none" }}>
            <FaSignOutAlt className="me-3" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
