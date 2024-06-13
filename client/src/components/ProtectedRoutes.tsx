import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isLoggedin } = useAuth();

  return isLoggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;