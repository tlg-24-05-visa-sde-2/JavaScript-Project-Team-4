import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/Nabar";
import Footer from "../../components/Footer";
import AllProductsSideNav from "../../components/Products/AllProductsSideNav";
import AllCategories from "../../components/Products/AllCategories";
import Fruits from "../../components/Products/Fruits";
import Vegetables from "../../components/Products/Vegetables";
import "../../assets/css/AllProducts.css"
import ProductService from "../../utils/ProductService";

function AllProducts(): React.ReactElement {
    const [category, setCategory] = useState<string>("all");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchAllProducts = async () => {
            setIsLoading(true);
            try {
                // Example logic to fetch products
                const response = await ProductService.getAllProducts();
                setProducts(response.products); // Assuming response is an array of products
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    const renderCategoryComponent = (): React.ReactElement => {
        switch (category) {
            case "all":
                return <AllCategories products={products} />; // Pass products to AllCategories
            // Add cases for other categories
            case "fruits":
                return <Fruits />;
              case "vegetables":
                return <Vegetables />;
              // Add more cases for other categories
              default:
                return <div>Select a category</div>;
        }
    };
    
    return (
        <div className="allProducts-wrapper">
            <NavbarComponent />
            <div className="d-flex flex-row">
                <AllProductsSideNav setCategory={setCategory} currentCategory={category} />
                <div className="allProducts-content">
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            {renderCategoryComponent()}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AllProducts;