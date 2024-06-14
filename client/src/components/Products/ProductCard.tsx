import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeart as regularHeart } from '@fortawesome/free-solid-svg-icons';
import "../../assets/css/single-card.css"

interface ProductCardProps {
  product: any;
  isFavorite: boolean;
  onAddFavorite: (productId: string) => void;
  onRemoveFavorite: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(product._id);
    } else {
      onAddFavorite(product._id);
    }
  };

  return (
    <Card className="favorite-card">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Button
          variant="link"
          className="favorite-button"
          onClick={handleFavoriteClick}
        >
          <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
        </Button>
      <Card.Body>
     
        <Card.Title className="favorite-card-title">{product.name}</Card.Title>
        <Card.Text className="favorite-card-body">
          
          <br />
          {product.sellersName}
          <br />
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
