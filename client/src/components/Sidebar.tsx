import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import "../assets/css/sidebar.css"

const Sidebar: React.FC = () => {
return (
    <aside className="sidebar">
      <div className="profile">
        <img src="path/to/profile/to-be-handled-here.jpg" alt="Profile" className="profile-img" />
        <h3>Welcome John Doe</h3>  //need to add dynamic call to get user name here
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/profile/orders" className="sidebar-link">Orders</Link>
        <Link to="/profile/favorites" className="sidebar-link">Favorites</Link>
        <Link to="/profile/personal-data" className="sidebar-link">Personal Data</Link>
        <Link to="/profile/reviews" className="sidebar-link">Reviews</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;