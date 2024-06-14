import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserService from '../utils/UserService';
import ProductCard from '../components/Products/ProductCard';
import '../assets/css/favorite.css';

interface FavoritesProps {
  user: any;
}

const Favorites: React.FC<FavoritesProps> = ({ user }) => {
  const [favorites, setFavorites] = useState<any[]>(user?.favorites || []);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await UserService.fetchUserData();
      if (data && data.user && data.user.favorites) {
        const uniqueFavorites = data.user.favorites.filter((favorite: any, index: number, self: any[]) =>
          index === self.findIndex((f: any) => f._id === favorite._id)
        );
        setFavorites(uniqueFavorites);
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
      if (response && response.message === 'Product added to favorites') {
        setFavorites([...favorites, response.product]);
      }
    }
  };

  const handleRemoveFavorite = async (index: number) => {
    const productId = favorites[index]._id;
    const response = await UserService.removeFavoriteProduct(productId);
    if (response && response.message === 'Product removed from favorites') {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
    } else {
      alert('Error removing product from favorites');
    }
  };

  return (
    <Container>
      <h1>Favorites</h1>
      <Row className="d-flex flex-wrap justify-content-center">
        {favorites.map((product: any, index: number) => (
          <Col key={index} className="d-flex justify-content-center favorite-card">
            <ProductCard
              product={product}
              isFavorite={true}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={() => handleRemoveFavorite(index)}
              showRemoveButton={true}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favorites;
