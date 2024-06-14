import React from 'react';
import PersonalData from './PersonalData';
import ProductReviews from './ProductReviews';
import '../assets/css/maincontent.css'; // Ensure this CSS file is imported
import { Spinner } from 'react-bootstrap';
import Favorites from './Favorites';

interface MainContentProps extends React.PropsWithChildren<{}> {
  user: any;
  activeView: string;
}

const MainContent: React.FC<MainContentProps> = ({ user, activeView }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'personal-data':
        return <PersonalData user={user} />;
      case 'product-reviews':
        return <ProductReviews />;
      case 'sign-out':
        return (
         <div className="text-center">
            <Spinner animation="border" />
            <p>Logging out...</p>
          </div>
        ); 
      case 'favorites':
          return <Favorites user={user} />;
      default:
        return <div className="default-message">Select a menu item to view more information!</div>;
    }
  };

  return (
    <main className="main-content">
      {renderContent()}
    </main>
  );
};

export default MainContent;