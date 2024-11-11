import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Button, InputGroup, FormControl, Container } from 'react-bootstrap';
import { FiSearch } from "react-icons/fi";
import avtar from '../assets/Avatar.png'
import { FaBell } from "react-icons/fa";

export default function Header() {
    const [notifications, setNotifications] = useState([
        'New habit reminder',
        'Goal achieved!',
        'Don\'t forget to update your progress'
    ]);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const clearNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    return (
        <>
            <div className='header'>
                <Navbar expand="sm" className="navbar bg-white rounded border-bottom p-2">
                    <Container fluid>
                        {/* Search Bar */}
                        <Navbar.Brand className="w-20 d-sm-block">
                            <InputGroup className="align-items-center search-bar rounded-2 px-3 py-2">
                                
                                    <FiSearch className='search-icon' />
                                
                                <FormControl
                                    className="border-0"
                                    placeholder="Search Here"
                                    aria-label="Search"
                                />
                            </InputGroup>
                        </Navbar.Brand>

                        {/* Toggle Button for Small Screens */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="d-flex align-items-center">
                                {/* Notification Icon */}
                                <Button
                                    variant="light"
                                    className="position-relative me-3 px-2 text-black notification-icon"
                                    onClick={toggleNotifications}
                                >
                                    <FaBell />
                                    {notifications.length > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {notifications.length}
                                        </span>
                                    )}
                                </Button>

                                {/* Notification Dropdown */}
                                {showNotifications && (
                                    <div
                                        className="notification-dropdown position-absolute bg-white border shadow-sm p-2"
                                        style={{ right: '60px', top: '50px', width: '280px', zIndex: 1000 }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="mb-0">Notifications</h6>
                                            <Button variant="link" size="sm" onClick={clearNotifications} className="text-primary">
                                                Clear All
                                            </Button>
                                        </div>
                                        <ul className="list-unstyled">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification, index) => (
                                                    <li key={index} className="border-bottom py-2 text-muted">
                                                        {notification}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-muted">No new notifications</li>
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {/* User Profile */}
                                <Dropdown align="center">
                                    <Dropdown.Toggle
                                        variant="light"
                                        id="dropdown-basic"
                                        className="d-flex align-items-center p-2 border-0"
                                    >
                                        <img
                                            src={avtar}
                                            alt="User"
                                            className="rounded-circle me-2"
                                            width="35"
                                            height="35"
                                        />
                                        <div>
                                            <span>Moni Roy</span>
                                            <br />
                                            <small className="text-muted">Admin</small>
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                                        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Nav>
                        </Navbar.Collapse>

                    </Container>
                </Navbar>
            </div>
        </>
    );
}