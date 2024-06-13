import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SingleProduct from "../../components/SingleProduct";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sellersName: string;
  image: string;
}

interface ProductsProps {
  products: Product[];
}

function Products({ products }: ProductsProps): React.ReactElement {
  return (
    <Container>
      <Row xs={1} sm={2} md={2} lg={4}>
        {products.map((product, index) => (
          <Col>
            <SingleProduct product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
