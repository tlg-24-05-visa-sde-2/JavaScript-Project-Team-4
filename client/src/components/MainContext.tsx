import React from 'react';
import { Route, Routes } from 'react-router-dom';
//import Orders from '../components/Orders';
//import Favorites from '.../components/Favorites';
//import PersonalData from '../components//PersonalData';
//import Reviews from '../components/Reviews';


interface MainContentProps {
    activeView: string;
  }
  
  const MainContent: React.FC<MainContentProps> = ({ activeView }) => {
    const renderContent = () => {
      switch (activeView) {
        case 'orders':
          return <Orders />;
        case 'favorites':
          return <Favorites />;
        case 'personal-data':
          return <PersonalData />;
        case 'reviews':
          return <Reviews />;
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