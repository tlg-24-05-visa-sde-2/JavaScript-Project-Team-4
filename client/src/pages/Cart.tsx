import React from "react";
import { Link } from "react-router-dom";
import UserService from "../utils/UserService";
import { toast } from "react-toastify";
import "../assets/css/cart.css";
import Navbar from "../components/Nabar";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

interface cartProps {
  props: {
    userData: {
      cart?: any[];
      totalPrice: number;
    };
    setReRender: any;
  };
}

const Cart = ({ props }: cartProps): React.ReactElement => {
  const removeItem = async (id: string) => {
    const response = await UserService.removeProductFromCart(id);
    if (response.message === "Product removed from shopping cart") {
      props.setReRender((prev: boolean) => !prev);
      toast.success("Product removed from shopping cart", {
        position: "top-center",
      });
    }
  };

  const totalPrice: number = props?.userData?.totalPrice ?? 0;

  return (
    <div>
      <Navbar props={props} />
      <main className="page">
        <section className="shopping-cart dark">
          <div className="container">
            <div className="block-heading">
              <h2>Shopping Cart</h2>
              <p>Not finished?</p>
              <Link to="/products" className="btn continue-shopping">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Continue Shopping
              </Link>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="items">
                    {/* Replace with dynamic content */}
                    {props.userData?.cart && props.userData.cart.length > 0 ? (
                      props.userData.cart.map((item, index) => (
                        <div className="product" key={index}>
                          <div className="row">
                            <div className="col-md-3">
                              <img
                                className="img-fluid mx-auto d-block image"
                                src={item.product.image}
                                alt={item.product.name}
                              />
                            </div>
                            <div className="col-md-7">
                              <div className="info">
                                <div className="row">
                                  <div className="col-md-6 product-name">
                                    <h5 className="mb-0">
                                      <Link
                                        to={`/product/${item.product._id}`}
                                        className="text-dark d-inline-block"
                                      >
                                        {item.product.name}
                                      </Link>
                                    </h5>
                                  </div>
                                  <div className="col-md-6 quantity">
                                    <label htmlFor={`quantity-${index}`}>Quantity:</label>
                                    <input
                                      id={`quantity-${index}`}
                                      type="number"
                                      value={item.quantity}
                                      className="form-control quantity-input"
                                      disabled // Disable for now since it's not clear if this should be editable directly
                                    />
                                  </div>
                                  <div className="col-md-3 price m-5">
                                    <span>${item.product.price * item.quantity}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-2 text-center">
                              <button
                                onClick={() => removeItem(item.product._id)}
                                className="btn btn-sm btn-outline-danger"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="product">
                        <div className="row">
                          <div className="col-md-12 text-center">No items in cart</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <div className="summary">
                    <h3>Summary</h3>
                    <div className="summary-item">
                      <span className="text">Subtotal</span>
                      <span className="price">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Discount</span>
                      <span className="price">$0</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Shipping</span>
                      <span className="price">$0</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Total</span>
                      <span className="price">${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button href="/checkout" className="continue-shopping btn-dark mt-5" variant="primary" size="lg">
                      Checkout <FontAwesomeIcon icon={faArrowCircleRight} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;