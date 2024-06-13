import React from "react";
import SingleProduct from "../SingleProduct";

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
    products: Product[]; // Ensure products is typed as an array of any
}

const AllCategories: React.FC<AllCategoriesProps> = ({ products }) => {
    return (
        <div>
            <h1 className="text-center">All Categories</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {products && products.map((product: Product) => (
                    <SingleProduct key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllCategories;