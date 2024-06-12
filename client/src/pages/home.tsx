import React from "react";
import Navbar from "../components/Nabar";
import Footer from "../components/Footer";
import "../assets/css/home.css";
import CarouselComponent from "../components/Carousel";
function Home(): React.ReactElement {
  return (
    <div className="home-wrapper">
      <Navbar />
      <div>
        <div className="call-to-action">
          <div className="call-to-action-slogan">
            <h3>
              Discover the Heart of Our Community - Fresh, Local Produce and
              Unique Artisan Goods Delivered Right to Your Doorstep
            </h3>
          </div>
        </div>
        <div className="navigate-down-home"></div>
        <div className="featured-farmers-container">
          <h3>Featured Farmers</h3>
          <div className="featured-farmers">
            <CarouselComponent />
          </div>
        </div>
        <div className="popular-products-container">
          <h3>Popular Products</h3>
          <div className="popular-products"></div>
        </div>

        <div className="products"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
