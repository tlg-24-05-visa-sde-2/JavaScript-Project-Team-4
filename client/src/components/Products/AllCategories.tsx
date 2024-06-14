import React from "react";
import SingleProduct from "./SingleProduct";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sellersName: string;
  image: string;
  _id: string;
}

interface AllCategoriesProps {
  products: Product[];
  props: any; // Ensure products is typed as an array of any
}

const AllCategories: React.FC<AllCategoriesProps> = ({ products, props }) => {
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center">
        {products &&
          products.map((product: Product) => (
            <SingleProduct props={props} key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllCategories;
