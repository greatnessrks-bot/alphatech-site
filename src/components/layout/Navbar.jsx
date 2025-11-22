import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, NavLink } from 'react-router-dom';

import { useTheme } from '../../context/ThemeContext.jsx'; 
import { useAuth } from '../../context/AuthContext.jsx';
// ⭐ NEW: Import course navigation context
import { useCourseNavigation } from '../../context/CourseNavigationContext.jsx';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();
  
  // ⭐ NEW: Get last course path
  const { lastCoursePath } = useCourseNavigation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };
  
  // ⭐ NEW: Handle courses navigation - goes to last position
  const handleCoursesClick = (e) => {
    e.preventDefault();
    navigate(lastCoursePath);
  };
  
  // Base navigation links
  const baseNavLinks = [
    { title: 'Home', path: '/' },
    { title: 'Courses', path: '/courses', onClick: handleCoursesClick }, // ⭐ Added custom handler
    { title: 'About', path: '/about' },
  ];

  // Conditionally add Dashboard link
  const navLinks = isLoggedIn 
    ? [baseNavLinks[0], { title: 'Dashboard', path: '/dashboard' }, ...baseNavLinks.slice(1)]
    : baseNavLinks;
  
  // Common style for NavLinks
  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '0.95rem',
    fontWeight: isActive ? 700 : 500,
    borderBottom: isActive ? '2px solid' : 'none',
    paddingBottom: isActive ? '2px' : '0',
    borderColor: 'primary.main',
    transition: 'all 0.15s ease-in-out',
  });

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: mode === 'dark' 
            ? 'rgba(15, 23, 42, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box 
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AlphaTech
              </Typography>
            </Box>

            {/* Desktop Menu Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Typography
                  key={link.title}
                  component={NavLink}
                  to={link.path}
                  style={linkStyle}
                  onClick={link.onClick || undefined} // ⭐ Use custom handler if provided
                >
                  {link.title}
                </Typography>
              ))}
              
              {/* Theme Toggle */}
              <IconButton onClick={toggleTheme} color="inherit" size="small" sx={{ ml: 1 }}>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              {/* Dynamic Auth Actions (Desktop) */}
              {isLoggedIn ? (
                <Box sx={{ ml: 2 }}>
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar 
                      alt={user?.email.charAt(0).toUpperCase() || 'U'} 
                      src={user?.profilePic} 
                      sx={{ 
                        bgcolor: 'secondary.main', 
                        width: 40, 
                        height: 40,
                      }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{ elevation: 2 }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>Dashboard</MenuItem>
                    <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => navigate('/login')}
                    sx={{ ml: 1, px: 3 }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/signup')}
                    sx={{ px: 3 }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;