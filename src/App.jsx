import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import LoginModal from './components/auth/LoginModal.jsx'; 
import SignupModal from './components/auth/SignupModal.jsx'; 
import Courses from './pages/Courses.jsx'; 
import CourseDetail from './pages/CourseDetail.jsx';
import CategoryDetail from './pages/CategoryDetail.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import { CourseNavigationProvider } from './context/CourseNavigationContext.jsx';
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
            <Route path="/courses" element={<Courses />} /> 
            <Route path="/category/:categoryID" element={<CategoryDetail />} />
            <Route path="/course/:id" element={<CourseDetail />} /> 
            <Route path="/about" element={<About />} />
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