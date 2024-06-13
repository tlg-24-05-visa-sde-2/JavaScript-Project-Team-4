import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContext';
import '../assets/css/profile.css';

const Profile: React.FC = () => {
    const [activeView, setActiveView] = useState('default');
  
    return (
      <div className="profile-page">
        <Sidebar setActiveView={setActiveView} />
        <MainContent activeView={activeView} />
      </div>
    );
  };
  
  export default Profile;
