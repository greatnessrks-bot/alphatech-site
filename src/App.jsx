import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Import layout components
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Import pages and modals
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LoginModal from './components/auth/LoginModal.jsx'; 
import SignupModal from './components/auth/SignupModal.jsx'; 

// Import course pages
import Courses from './pages/Courses.jsx'; 
import CourseDetail from './pages/CourseDetail.jsx';
import CategoryDetail from './pages/CategoryDetail.jsx';

// Import the security wrapper
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';

// ⭐ NEW: Import course navigation provider
import { CourseNavigationProvider } from './context/CourseNavigationContext.jsx';
// ⭐ NEW: Import course progress provider
import { CourseProgressProvider } from './context/CourseProgressContext.jsx';

function App() {
  return (
    // ⭐ NEW: Wrap with both providers
    <CourseNavigationProvider>
      <CourseProgressProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/signup" element={<SignupModal />} /> 

            {/* Course Routes */}
            <Route path="/courses" element={<Courses />} /> 
            <Route path="/category/:categoryID" element={<CategoryDetail />} />
            <Route path="/course/:id" element={<CourseDetail />} /> 

            {/* Protected Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Box>
        <Footer />
      </Box>
      </CourseProgressProvider>
    </CourseNavigationProvider>
  );
}

export default App;