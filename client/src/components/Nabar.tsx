import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import AuthService from "../utils/AuthService";
import "../assets/css/navbar.css";
import UserService from "../utils/UserService";

interface NavbarProps {
  props: {
    userData: {
      cart?: any[];
      totalPrice: number;
    };
    setReRender: any;
  };
}

export default function NavbarComponent({
  props,
}: NavbarProps): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showCartDropdown, setShowCartDropdown] = useState<boolean>(false);

  const handleLogout = async () => {
    const response = await AuthService.handleLogout();
    if (response === "Logout successful") {
      setIsAuthenticated(false);
      window.location.reload();
    }
  };

  const removeItem = async (id: string) => {
    const response = await UserService.removeProductFromCart(id);
    if (response.message === "Product removed from shopping cart") {
      props.setReRender((prev: boolean) => !prev);
      toast.success("Product removed from shopping cart", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await AuthService.checkLogin();
      setIsAuthenticated(loggedIn);
    };
    checkLogin();
  }, []);

  const handleMouseEnter = () => {
    setShowCartDropdown(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowCartDropdown(false);
    }, 400);
  };

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
                <Dropdown
                  show={showCartDropdown}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  align="end" /* This ensures the dropdown aligns to the end of the container */
                >
                  <Dropdown.Toggle
                    as={Nav.Link}
                    id="cart-dropdown"
                    className="position-relative"
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    {props.userData?.cart && props.userData.cart.length > 0 && (
                      <Badge
                        pill
                        bg="danger"
                        className="position-absolute top-0 start-100 translate-middle"
                      >
                        {props.userData.cart.length}
                      </Badge>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu-custom">
                    <Dropdown.Item className="d-flex justify-content-between">
                      <div>
                        Total: ${props.userData && props.userData.totalPrice !== undefined ? props.userData.totalPrice.toFixed(2) : '0.00'}
                      </div>
                    </Dropdown.Item>
                    <div className="d-flex flex-column">
                      {props.userData?.cart &&
                      props.userData.cart.length > 0 ? (
                        props.userData.cart.map((item, index) => (
                          <div key={index} className="d-flex flex-column m-2 border-bottom">
                            <Link
                              to={`/product/${item.product._id}`}
                              className="dropdown-item-custom"
                            >
                              <div className="d-flex align-items-center cart-item">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    marginRight: "10px",
                                  }}
                                />
                                {item.product.name} - ${item.product.price}: x{" "}
                                {item.quantity}
                              </div>
                            </Link>
                            <button
                              onClick={() => removeItem(item.product._id)}
                              className="btn btn-danger w-50 p-0 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      ) : (
                        <Dropdown.Item>No items in cart</Dropdown.Item>
                      )}
                      <Link
                        to="/cart"
                        className="btn text-center text-dark align-self-center custom-link-nav"
                      >
                        Go to Cart
                      </Link>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
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
                <NavDropdown.Item href="/checkout">
                  Go to Checkout
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile">
                  Profile
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
