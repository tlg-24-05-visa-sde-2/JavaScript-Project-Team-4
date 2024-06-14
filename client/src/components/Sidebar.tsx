import React, { useState } from 'react';
import { PickerOverlay } from 'filestack-react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/sidebar.css'; // Ensure this CSS file is imported
import SignOut from './SignOut';

interface SidebarProps {
  setActiveView: (view: string) => void;
  user: any;
  setShowPicker: (show: boolean) => void;
  showPicker: boolean;
  fileStackKey: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveView, user, setShowPicker, showPicker, fileStackKey }) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(user.profileImage || 'https://th.bing.com/th/id/OIP.ctA2REXIY1pykimhbEMYxQHaHa?w=219&h=219&c=7&r=0&o=5&pid=1.7');
  const navigate = useNavigate();

  const handleUploadSuccess = (result: any) => {
    setProfileImage(result.filesUploaded[0].url);
    setShowPicker(false);
  };

  const handleOpenPicker = () => {
    setShowPicker(true);
  };

  const handleSignOutConfirmed = () => {
    setActiveView('sign-out');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="sidebar2">
      <div className="upload-image-container mb-3">
        <img src={profileImage} alt="Profile" className="rounded-circle img-thumbnail" width="300" />
        <button className="btn btn-link" onClick={handleOpenPicker}>Change Picture</button>
      </div>
      {showPicker && (
        <div className="picker-overlay">
          <PickerOverlay
            apikey={fileStackKey}
            onSuccess={handleUploadSuccess}
            onError={(error: any) => console.error('Upload error:', error)}
          />
        </div>
      )}
      <div className="user-info-container">
        <h2 className="h4">Welcome, {user.firstName} {user.lastName}</h2>
        <button className="btn btn-outline-dark w-100 mb-2" onClick={() => setActiveView('orders')}>Orders</button>
        <button className="btn btn-outline-dark w-100 mb-2" onClick={() => setActiveView('favorites')}>Favorites</button>
        <button className="btn btn-outline-dark w-100 mb-2" onClick={() => setActiveView('personal-data')}>Personal Data</button>
        <button className="btn btn-outline-dark w-100 mb-2" onClick={() => setActiveView('product-reviews')}>Reviews</button>
        <SignOut onSignOutConfirmed={handleSignOutConfirmed} />
      </div>
    </div>
  );
};

export default Sidebar;
