import React, { useState, useEffect } from "react";
import ProductService from "../../utils/ProductService";
import AllCategories from "./AllCategories";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sellersName: string;
  image: string;
  _id: string;
}

interface FruitsProps {
  props: any; // Ensure products is typed as an array of any
}

function Fruits({ props }: FruitsProps): React.ReactElement {
  const [fruits, setFruits] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFruits = async () => {
      setLoading(true);
      try {
        const response = await ProductService.searchProducts("fruit");
        setFruits(response.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  return (
    <div className="allProducts-wrapper">
      <div className="d-flex flex-row">
        <div className="allProducts-content">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {fruits.length === 0 ? (
                <h1>No products found</h1>
              ) : (
                <AllCategories products={fruits} props={props} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Fruits;
