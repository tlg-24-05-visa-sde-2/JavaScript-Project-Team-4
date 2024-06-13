import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import AuthService from "../utils/AuthService";
import "../assets/css/navbar.css";

interface NavbarProps {
  props: {
    userData: {
      cart?: any[];
    };
  };
}

export default function NavbarComponent({ props }: NavbarProps): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogout = async () => {
    const response = await AuthService.handleLogout();
    if (response === "Logout successful") {
      setIsAuthenticated(false);
      window.location.reload();
    }
  };

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
        <Navbar.Brand href="/">Hometown Harvest</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          {isAuthenticated ? (
            <>
              <Nav>
                <Nav.Link href="/cart" className="position-relative">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {props.userData?.cart && props.userData.cart.length > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                      {props.userData.cart.length}
                    </Badge>
                  )}
                </Nav.Link>
              </Nav>
              <div className="vr"></div>
              <NavDropdown
                title={<FontAwesomeIcon icon={faUser} />}
                id="basic-nav-dropdown"
                drop={"start"}
                className="nav-dropdown-profile"
              >
                <NavDropdown.Item href="/products/create-product">
                  New Product
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
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
