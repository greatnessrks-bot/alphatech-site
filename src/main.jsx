import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Import all Context Providers
import { AuthProvider } from './context/AuthContext';
// Use the name from your file:
import { ThemeProvider } from './context/ThemeContext'; 
import { ProgressProvider } from './context/ProgressContext'; 

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. ThemeProvider (which contains MUIThemeProvider and CssBaseline) */}
    <ThemeProvider>
      {/* 2. BrowserRouter for all routing */}
      <BrowserRouter>
        {/* 3. Auth and Progress Providers */}
        <AuthProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);