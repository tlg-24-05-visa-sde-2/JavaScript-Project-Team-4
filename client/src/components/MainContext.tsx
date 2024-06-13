import React from 'react';
import ProductReviews from './ProductReviews';
//import Orders from '../components/Orders';
//import Favorites from '.../components/Favorites';
import PersonalData from '../components//PersonalData';
//import Reviews from '../components/Reviews';


interface MainContentProps {
    activeView: string;
  }
  
  const MainContent: React.FC<MainContentProps> = ({ activeView }) => {
    const renderContent = () => {
      switch (activeView) {
      //   case 'orders':
      //     return <Orders />;
      //   case 'favorites':
      //     return <Favorites />;
       case 'personal-data':
         return <PersonalData />;
        case 'reviews':
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