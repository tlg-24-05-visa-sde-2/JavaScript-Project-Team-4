import React from 'react';
import { useAuth } from "../utils/AuthContext";
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="main-content-wrapper">
        <MainContent />
        <button onClick={logout} className="logout-button">Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;

