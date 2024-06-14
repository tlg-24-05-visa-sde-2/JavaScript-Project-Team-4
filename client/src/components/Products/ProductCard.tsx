import React from 'react';
import { Card, Button } from 'react-bootstrap';
import UserService from '../../utils/UserService';

interface ProductCardProps {
  product: any;
  isFavorite?: boolean;
  onRemoveFavorite?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite = false, onRemoveFavorite }) => {
  const handleAddFavorite = async () => {
    await UserService.addFavoriteProduct(product._id);
    // Optionally, you can update the state to reflect the change
  };

  const handleRemoveFavorite = async () => {
    if (onRemoveFavorite) {
      await UserService.removeFavoriteProduct(product._id);
      onRemoveFavorite(product._id);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
        {isFavorite ? (
          <Button variant="danger" onClick={handleRemoveFavorite}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant="outline-danger" onClick={handleAddFavorite}>
            <i className="fa fa-heart"></i> Add to Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;