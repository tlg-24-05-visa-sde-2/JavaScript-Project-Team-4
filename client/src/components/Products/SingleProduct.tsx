import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import UserService from "../../utils/UserService";
import "../../assets/css/favorite.css";

interface Product {
  image: string;
  name: string;
  description: string;
  price: number;
  sellersName: string;
  _id: string;
}

interface ProductProps {
  product: Product;
  props: any;
}

function SingleProduct({ product, props }: ProductProps): React.ReactElement {
  const { image, name, price, description, sellersName, _id } = product;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityUp = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleQuantityDown = () => {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const addProductToCart = async (e: any) => {
    e.preventDefault();

    const response = await UserService.addProductToCart(_id, quantity);
    if (response.message === "Product added to shopping cart") {
      props.setReRender(true);
      toast.success(response.message, {
        position: "top-center",
      });
    } else {
      toast.error("Error adding product to cart");
    }
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      await UserService.removeFavoriteProduct(_id);
      toast.info("Product removed from favorites");
    } else {
      await UserService.addFavoriteProduct(_id);
      toast.success("Product added to favorites");
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Card style={{ width: "18rem", minHeight: "100%", margin: "5px", border: "2px solid #283618", position: "relative" }}>
      <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        onClick={toggleFavorite}
        className="position-absolute top-0 end-0 m-2"
        style={{ cursor: 'pointer', color: isFavorite ? 'red' : 'black' }}
        size="lg"
      />
      <Link to={`/product/${_id}`}>
        <Card.Img
          variant="top"
          src={image}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`} className="single-title">
          <Card.Title className="single-title">{name}</Card.Title>
        </Link>

        <Card.Text className="seller-single">{sellersName}</Card.Text>

        <Card.Text className="seller-single">from ${price}</Card.Text>
        <div className="quantity-container">
          <Button onClick={handleQuantityDown} className="quantity-button">
            -
          </Button>
          <input
            type="text"
            id="quantity"
            className="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <Button onClick={handleQuantityUp} className="quantity-button">
            +
          </Button>
        </div>

        <Button
          variant="primary"
          onClick={addProductToCart}
          className="product-button"
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;

