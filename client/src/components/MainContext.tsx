import React, { useState } from 'react';
import PersonalData from './PersonalData';
import ProductReviews from './ProductReviews';

interface MainContentProps extends React.PropsWithChildren<{}> {
  user: any;
}

const MainContent: React.FC<MainContentProps> = ({ user }) => {
  const [activeView, setActiveView] = useState('default');

  const renderContent = () => {
    switch (activeView) {
      case 'personal-data':
        return <PersonalData user={user} />;
      case 'product-reviews':
        return <ProductReviews />;
      default:
        return <div>Welcome to your profile!</div>;
    }
  };

  return (
    <main className="main-content">
      {renderContent()}
    </main>
  );
};

export default MainContent;