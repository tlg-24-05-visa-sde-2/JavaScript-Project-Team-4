import React from "react";
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
  const { image, name, price, description, sellersName } = product;

  return (
    <Card style={{ width: "18rem", height: "100%" }}>
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{sellersName}</Card.Text>
        <div className="card-description">
          <Card.Text>{description}</Card.Text>
        </div>

        <Card.Text>from ${price}</Card.Text>
        <Button variant="primary" className="product-button">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;
