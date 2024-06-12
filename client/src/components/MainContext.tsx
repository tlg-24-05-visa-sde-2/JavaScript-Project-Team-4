import React from 'react';
import { Route, Routes } from 'react-router-dom';
//import Orders from '../components/Orders';
//import Favorites from '.../components/Favorites';
//import PersonalData from '../components//PersonalData';
//import Reviews from '../components/Reviews';

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/profile" element={<div>Welcome to your profile!</div>} />
        {/* <Route path="/profile/orders" element={<Orders />} />
        <Route path="/profile/favorites" element={<Favorites />} />
        <Route path="/profile/personal-data" element={<PersonalData />} />
        <Route path="/profile/reviews" element={<Reviews />} /> */}
      </Routes>
    </main>
  );
}; 

export default MainContent;