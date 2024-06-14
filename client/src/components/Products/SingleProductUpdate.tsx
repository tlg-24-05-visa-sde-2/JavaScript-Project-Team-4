import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/ImportedCard.css"
import UserService from "../../utils/UserService";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

interface Product {
    image: string;
    name: string;
    description: string;
    price: number;
    sellersName: string;
    _id: string;
  }
  
  interface ProductProps {
    product: Product;
    props: any;
  }

  function SingleProductUpdate({ product, props }: ProductProps): React.ReactElement {
    const { image, name, price, description, _id } = product;
  
    const [quantity, setQuantity] = useState(1);
  
    const handleQuantityUp = () => {
      setQuantity((quantity) => quantity + 1);
    };
  
    const handleQuantityDown = () => {
      setQuantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
    };
  
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value) && value > 0) {
        setQuantity(value);
      }
    };
  
    const addProductToCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
  
      const response = await UserService.addProductToCart(_id, quantity);
      if (response.message === 'Product added to shopping cart') {
        props.setReRender(true);
        toast.success(response.message, {
          position: 'top-center',
        });
      } else {
        toast.error('Error adding product to cart');
      }
    };
  
    return (
        <Link to={`/product/${_id}`} className="wrapper">
        <div className="container p-3">
          <div className="top mb-3" style={{ backgroundImage: `url(${image})` }}></div>
          <div className="bottom">
            <div className="left">
              <div className="details">
                <h5>{name}</h5>
                <p>From: ${price}</p>
              </div>
              <div className="d-flex flex-column w-100 align-items-center justify-content-center p-1">
                <div className="buy">
                    <Button className="button-search-custom" onClick={addProductToCart}>
                    <FontAwesomeIcon icon={faCartArrowDown} className="icon" />
                    </Button>
                </div>
                <div className="quantity">
                    <Button variant="light" onClick={handleQuantityDown}>-</Button>
                    <input type="text" value={quantity} onChange={handleQuantityChange} />
                    <Button variant="light" onClick={handleQuantityUp}>+</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inside">
          <div className="icon">
            <i className="material-icons">Details</i>
          </div>
          <div className="contents">
            <h4>{description}</h4>
          </div>
        </div>
      </Link>
    );
  }
  
  export default SingleProductUpdate;