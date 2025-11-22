import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A wrapper component that checks for authentication.
 * If logged in, renders the children. Otherwise, redirects to the home page.
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // User is not logged in, redirect them to the home page or a login page
    return <Navigate to="/" replace />;
  }

  // User is logged in, render the protected content
  return children;
};

export default ProtectedRoute;