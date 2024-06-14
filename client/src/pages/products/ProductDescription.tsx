import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProductService from "../../utils/ProductService";
import "../../assets/css/product.css";
import Navbar from "../../components/Nabar";
import Footer from "../../components/Footer";
import UserService from "../../utils/UserService";
import { toast } from "react-toastify";

interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  sellersName: string;
  sellersLocation: string;
}

interface ProductDescriptionProps {
  props: any;
}

const ProductDescription = ({
  props,
}: ProductDescriptionProps): React.ReactElement => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id?: string }>();

  const addProductToCart = async (e: any) => {
    e.preventDefault();
    let response;

    if (id) {
      response = await UserService.addProductToCart(id, quantity);
    }

    if (response.message === "Product added to shopping cart") {
      props.setReRender(true);
      toast.success(response.message, {
        position: "top-center",
      });
    } else {
      toast.error("Error adding product to cart");
    }
  };

  const handleQuantityUp = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleQuantityDown = () => {
    setQuantity((quantity) => quantity - 1);
  };

  useEffect(() => {
    const getSingleProduct = async (id: string) => {
      const response = await ProductService.getSingleProduct(id);
      setProduct(response.product);
    };

    if (id) {
      getSingleProduct(id);
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar props={props} />
      <div className="product-container">
        <div className="product-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-title">
          <h2>{product.name}</h2>
          <h3>{product.sellersName}</h3>
          <p>{product.sellersLocation}</p>
        </div>
        <div className="product-description">
          <p>{product.description}</p>
        </div>
        <div className="quantity-container">
          <Button onClick={handleQuantityDown} className="quantity-button">
            -
          </Button>
          <input
            type="text"
            id="quantity"
            className="quantity"
            value={quantity}
          />

          <Button onClick={handleQuantityUp} className="quantity-button">
            +
          </Button>
        </div>

        <Button
          variant="primary"
          className="product-button"
          onClick={addProductToCart}
        >
          Add to Cart
        </Button>
      </div>

      <Footer />
    </>
  );
};

export default ProductDescription;
