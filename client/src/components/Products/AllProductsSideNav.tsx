import React, { useState } from "react";
import {
  MDBIcon,
  MDBCollapse,
  MDBRipple,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import "../../assets/css/SideNavProduct.css";

interface AllProductsSideNavProps {
  setCategory: (category: string) => void;
  currentCategory: string;
}

const AllProductsSideNav: React.FC<AllProductsSideNavProps> = ({ setCategory, currentCategory }) => {
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <>
      <MDBCollapse open={showShow} tag="nav" className="d-lg-block bg-white sidebar">
        <div className="position-sticky">
          <h3>Categories</h3>
          <MDBListGroup flush="true" className="mx-3 mt-4">
            <MDBRipple rippleTag="span">
              <MDBListGroupItem 
                tag="a" 
                href="#" 
                onClick={() => setCategory("all")} 
                action 
                className={`border-0 border-bottom rounded ${currentCategory === "all" ? "active" : ""}`}>
                <MDBIcon fas icon="pallet me-3" />
                All Products
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem 
                tag="a" 
                href="#" 
                onClick={() => setCategory("fruits")} 
                action 
                className={`border-0 border-bottom rounded ${currentCategory === "fruits" ? "active" : ""}`}>
                <MDBIcon fas icon="apple-whole me-3" />
                Fruits
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem 
                tag="a" 
                href="#" 
                onClick={() => setCategory("vegetables")} 
                action 
                className={`border-0 border-bottom rounded ${currentCategory === "vegetables" ? "active" : ""}`}>
                <MDBIcon fas icon="carrot me-3" />
                Vegetables
              </MDBListGroupItem>
            </MDBRipple>

          </MDBListGroup>
        </div>
      </MDBCollapse>
    </>
  );
}

export default AllProductsSideNav;