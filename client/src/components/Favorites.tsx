import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import UserService from '../utils/UserService';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface FavoritesProps {
  user: any;
}

const Favorites: React.FC<FavoritesProps> = ({ user }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      const userData = await UserService.fetchUserData();
      if (userData.user) {
        setFavorites(userData.user.favorites);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (productId: string) => {
    await UserService.removeFavoriteProduct(productId);
    setFavorites(favorites.filter(product => product._id !== productId));
  };

  return (
    <Container>
      <h1>Favorites</h1>
      <Row>
        {favorites.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mb-4">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveFavorite(product._id)}>Remove</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favorites;
