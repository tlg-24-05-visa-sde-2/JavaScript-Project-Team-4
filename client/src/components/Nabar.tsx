import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthService from "../utils/AuthService";
import "../assets/css/navbar.css";

export default function NavbarComponent(): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  const handleLogout = async () => {
    const response = await AuthService.handleLogout();
    if (response === "Logout successful") {
      setIsAuthenticated(false);
      window.location.reload()
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await AuthService.checkLogin();
      setIsAuthenticated(loggedIn);
    };
    checkLogin();
  }, []); 

  

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Hometown Harvest</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          
          {isAuthenticated ? (
           <NavDropdown title={<FontAwesomeIcon icon={faUser} /> } id="basic-nav-dropdown" className="nav-dropdown-profile">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
            ) : (
              <Nav className="d-flex">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </Nav>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
