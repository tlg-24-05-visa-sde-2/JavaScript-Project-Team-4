

import React from 'react';
import PersonalData from './PersonalData';
import ProductReviews from './ProductReviews';
import '../assets/css/maincontent.css'; // Ensure this CSS file is imported

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