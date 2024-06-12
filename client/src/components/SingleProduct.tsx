import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface ProductsProps {
  img: string;
  name: string;
  price: number;
}

function Products(props: ProductsProps): React.ReactElement {
  const { img, name, price } = props;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>from ${price}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Products;
