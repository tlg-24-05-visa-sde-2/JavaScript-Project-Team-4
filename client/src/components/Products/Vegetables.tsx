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

interface VegetableProps {
  props: any; // Ensure products is typed as an array of any
}

function Vegetables({ props }: VegetableProps): React.ReactElement {
  const [vegetables, setVegetables] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVegetables = async () => {
      setLoading(true);
      try {
        const response = await ProductService.searchProducts("vegetable");
        setVegetables(response.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchVegetables();
  }, []);

  return (
    <div className="allProducts-wrapper">
      <div className="d-flex flex-row">
        <div className="allProducts-content">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {vegetables.length === 0 ? (
                <h1>No products found</h1>
              ) : (
                <AllCategories products={vegetables} props={props} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vegetables;
