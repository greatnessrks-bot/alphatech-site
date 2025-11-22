import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  // Use localStorage to persist the login state across page refreshes
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    // Providing a mock user structure if the user is logged in but no data is found (for safety)
    if (storedUser) {
      return JSON.parse(storedUser);
    } else if (localStorage.getItem('isLoggedIn') === 'true') {
      // Safety fallback for logged-in state without user object
      return null
    }
    return null;
  });

  // Function to handle login
  const login = (userData = { id: 'mock-user-1', email: 'user@alphatech.com', profilePic: 'https://placehold.co/40x40/6366f1/ffffff?text=JT' }) => {
    // 💡 In a real app, this runs AFTER a successful API call.
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom Hook to easily use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};