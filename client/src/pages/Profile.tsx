import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import UserService from '../utils/UserService';
import NavbarComponent from '../components/Nabar';
import CarouselComponent from '../components/Carousel';
import Footer from '../components/Footer';
import '../assets/css/profile.css';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  profileImage?: string;
}

interface ProfileProps {
  setShowPicker: (show: boolean) => void;
  showPicker: boolean;
  userData: any;
  isLoggedIn: boolean;
  fileStackKey: string;
}

const Profile: React.FC<ProfileProps> = ({ setShowPicker, showPicker, userData, isLoggedIn, fileStackKey }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string>('default');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UserService.fetchUserData();
        if (data.user) {
          setUser(data.user);
        } else {
          setError(data);
        }
      } catch (error) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-5">No user data available.</div>;
  }

  return (
    <div>
      <NavbarComponent props={{ userData, setReRender: setActiveView }} />
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
            <Sidebar
              setActiveView={setActiveView}
              user={user}
              setShowPicker={setShowPicker}
              showPicker={showPicker}
              fileStackKey={fileStackKey}
            />
          </div>
          <div className="col-md-9">
            <div className="card mb-4">
              <div className="card-body">
                <div className="background-image mt-3"></div>
              </div>
            </div>
            <MainContent user={user} activeView={activeView} />
          </div>
        </div>
      </div>
      <div className="carousel-container mt-5">
        <div className="local-markets-text">
          Check out local markets near you
        </div>
        <CarouselComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
