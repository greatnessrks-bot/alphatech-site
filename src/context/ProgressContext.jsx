import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const ProgressContext = createContext(null);

// 2. Create the Provider Component
export const ProgressProvider = ({ children }) => {
  // State to control the visibility of the global progress indicator
  const [isLoading, setIsLoading] = useState(false);

  // Function to start loading (show the indicator)
  const startLoading = () => {
    setIsLoading(true);
  };

  // Function to stop loading (hide the indicator)
  const stopLoading = () => {
    setIsLoading(false);
  };

  const value = {
    isLoading,
    startLoading,
    stopLoading,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

// 3. Custom Hook to easily use the context
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};