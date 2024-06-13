import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import UserService from "../../utils/UserService";
import { toast } from "react-toastify";

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

function SingleProduct({ product, props }: ProductProps): React.ReactElement {
  const { image, name, price, description, sellersName, _id } = product;

  const [quantity, setQuantity] = useState(1);

  const handleQuantityUp = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleQuantityDown = () => {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
  };

  // Add this handler
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const addProductToCart = async (e: any) => {
    e.preventDefault();

    const response = await UserService.addProductToCart(_id, quantity);
    console.log(response);
    if (response.message  === "Product added to shopping cart") {
      props.setReRender(true);
      toast.success(response.message);
    } else {
      toast.error("Error adding product to cart");
    }
  }

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      <Link to={`/product/${_id}`}>
        <Card.Img
          variant="top"
          src={image}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title>{name}</Card.Title>
        </Link>

        <Card.Text>{sellersName}</Card.Text>
        <div className="card-description">
          <Card.Text>{description}</Card.Text>
        </div>

        <Card.Text>from ${price}</Card.Text>
        <div className="quantity-container">
          <Button onClick={handleQuantityDown} className="quantity-button">
            -
          </Button>
          <input
            type="text"
            id="quantity"
            className="quantity"
            value={quantity}
            onChange={handleQuantityChange} // Add this line
          />
          <Button onClick={handleQuantityUp} className="quantity-button">
            +
          </Button>
        </div>

        <Button variant="primary" onClick={addProductToCart} className="product-button">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;
