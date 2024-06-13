import React from 'react';
import "../assets/css/sidebar.css";

interface SidebarProps {
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveView }) => {
  return (
    <aside className="sidebar">
      <button onClick={() => setActiveView('personal-data')}>Personal Data</button>
      <button onClick={() => setActiveView('product-reviews')}>Product Reviews</button>
    </aside>
  );
};

export default Sidebar;