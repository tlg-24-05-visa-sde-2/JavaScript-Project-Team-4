import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  sellersName: string;
}

interface ProductProps {
  product: Product;
}

function SingleProduct({ product }: ProductProps): React.ReactElement {
  const { image, name, price, description, sellersName, id } = product;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityUp = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleQuantityDown = () => {
    setQuantity((quantity) => {
      if (quantity === 1) {
        return quantity;
      } else {
        return quantity - 1;
      }
    });
  };

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      <Link to={`/product/${id}`}>
        <Card.Img
          variant="top"
          src={image}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${id}`}>
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
          />

          <Button onClick={handleQuantityUp} className="quantity-button">
            +
          </Button>
        </div>

        <Button variant="primary" className="product-button">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;
