import React, { useState, useEffect } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import UserService from '../utils/UserService';
import ProductCard from '../components/Products/ProductCard';
//

interface FavoritesProps {
  user: any;
}

const Favorites: React.FC<FavoritesProps> = ({ user }) => {
  const [favorites, setFavorites] = useState<any[]>(user?.favorites || []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await UserService.fetchUserData();
      if (data && data.user && data.user.favorites) {
        setFavorites(data.user.favorites);
      }
    };

    fetchFavorites();
  }, []);

  const handleAddFavorite = async (productId: string) => {
    const isAlreadyFavorited = favorites.some(product => product._id === productId);

    if (isAlreadyFavorited) {
      alert('This item is already in your favorites.');
    } else {
      const response = await UserService.addFavoriteProduct(productId);
      if (response.message === 'Product added to favorites') {
        setFavorites([...favorites, response.product]);
      }
    }
  };

  const handleRemoveFavorite = async (productId: string) => {
    await UserService.removeFavoriteProduct(productId);
    setFavorites(favorites.filter(product => product._id !== productId));
  };

  return (
    <Container>
      <h1>Favorites</h1>
      <Row className="d-flex flex-wrap justify-content-center">
        {favorites.map((product: any) => (
          <Col key={product._id} className="d-flex justify-content-center favorite-card">
            <ProductCard
              product={product}
              isFavorite={true}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favorites;
