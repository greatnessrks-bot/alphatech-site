import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseNavigationContext = createContext();

export const useCourseNavigation = () => {
  const context = useContext(CourseNavigationContext);
  if (!context) {
    throw new Error('useCourseNavigation must be used within CourseNavigationProvider');
  }
  return context;
};

export const CourseNavigationProvider = ({ children }) => {
  // Initialize from localStorage or default to '/courses'
  const [lastCoursePath, setLastCoursePath] = useState(() => {
    const saved = localStorage.getItem('lastCoursePath');
    return saved || '/courses';
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lastCoursePath', lastCoursePath);
  }, [lastCoursePath]);

  // Update the last visited course path
  const updateLastCoursePath = (path) => {
    setLastCoursePath(path);
  };

  // Reset to default (used when user manually exits)
  const resetToCoursesHome = () => {
    setLastCoursePath('/courses');
  };

  const value = {
    lastCoursePath,
    updateLastCoursePath,
    resetToCoursesHome,
  };

  return (
    <CourseNavigationContext.Provider value={value}>
      {children}
    </CourseNavigationContext.Provider>
  );
};

export default CourseNavigationContext;