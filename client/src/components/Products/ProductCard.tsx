import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeart as regularHeart } from '@fortawesome/free-solid-svg-icons';
import "../../assets/css/single-card.css";
import UserService from '../../utils/UserService';

interface ProductCardProps {
  product: any;
  isFavorite: boolean;
  onAddFavorite: (productId: string) => void;
  onRemoveFavorite: () => void;
  showRemoveButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onAddFavorite, onRemoveFavorite, showRemoveButton }) => {
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      onRemoveFavorite();
    } else {
      const response = await UserService.addFavoriteProduct(product._id);
      if (response && response.message === 'Product added to favorites') {
        onAddFavorite(product._id);
      } else {
        alert('This item is already in your favorites.');
      }
    }
  };

  return (
    <Card className="favorite-card" style={{ position: 'relative' }}>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Button
        variant="link"
        className="favorite-button"
        onClick={handleFavoriteClick}
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
      </Button>
      <Card.Body>
        <Card.Title className="favorite-card-title">{product.name}</Card.Title>
        <Card.Text className="favorite-card-body">
          {product.sellersName}
          <br />
          ${product.price}
        </Card.Text>
        {showRemoveButton && (
          <Button
            variant="danger"
            className="remove-button"
            onClick={onRemoveFavorite}
          >
            Remove
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
