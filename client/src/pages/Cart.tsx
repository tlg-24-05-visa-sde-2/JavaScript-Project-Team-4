import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../utils/UserService";
import { toast } from "react-toastify";
import "../assets/css/cart.css";

interface NavbarProps {
  props: {
    userData: {
      cart?: any[];
      totalPrice: number;
    };
    setReRender: any;
  };
}

const Cart = ({ props }: NavbarProps): React.ReactElement => {
  //cart/checkout link to checkout

  const removeItem = async (id: string) => {
    const response = await UserService.removeProductFromCart(id);
    if (response.message === "Product removed from shopping cart") {
      props.setReRender((prev: boolean) => !prev);
      toast.success("Product removed from shopping cart", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="cart-container">
      <div>
        <h1>Shopping Cart</h1>
        <div className="price-container">
          <div className="price-text">
            <span>Price</span>
          </div>
          <hr className="price-line"></hr>
        </div>

        {props.userData?.cart && props.userData.cart.length > 0 ? (
          props.userData.cart.map((item, index) => (
            <div key={index} className="d-flex flex-column m-2">
              <Link
                to={`/product/${item.product._id}`}
                className="dropdown-item-custom"
              >
                <div className="d-flex align-items-center cart-item">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      marginRight: "10px",
                    }}
                  />
                  <div className="item-horizontal">
                    <div className="item-left">
                      <h3 className="item-name">{item.product.name}</h3>
                      <p>By {item.product.sellersName}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">${item.product.price}</div>
                  </div>
                </div>
              </Link>
              <div className="remove-button">
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="btn btn-danger w-25 p-0 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No items in cart</div>
        )}
      </div>

      <div className="checkout-button">
        <Link to="/cart/checkout">
          <button className="btn btn-secondary w-50">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
