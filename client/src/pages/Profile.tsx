import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContext';
import Navbar from '../components/Nabar';
import Footer from '../components/Footer';
import '../assets/css/profile.css';

interface ProfileProps {
    props: any;
}

const Profile: React.FC<ProfileProps> = ({props}) => {
    const [activeView, setActiveView] = useState('default');
    return (
    <div> 
        <Navbar props={props} />
        <div className="profile-page">
            <Sidebar setActiveView={setActiveView} />
            <MainContent activeView={activeView} />
        </div>
        <Footer />
    </div>
    );
  };
  
  export default Profile;
