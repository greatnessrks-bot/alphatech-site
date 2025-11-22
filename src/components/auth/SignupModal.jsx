import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link as MuiLink,
  useTheme,
  InputAdornment, 
  IconButton,     
} from '@mui/material';
import { PersonAddOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // <-- NEW: Import Auth Hook

const SignupPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // --- NEW: State for form inputs ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // --- NEW: Custom hook for Auth Context ---
  const { login } = useAuth();

  // State to handle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // --- NEW: Handle input change ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- UPDATED: Handle Form Submission ---
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Registration successful! User:', formData.email);

    // 1. MOCK API CALL SUCCESS: (Replace this with your actual API call later)
    const userData = {
      id: 'signup-' + Date.now(),
      email: formData.email,
      name: formData.name,
    };
    
    // 2. UPDATE GLOBAL AUTH STATE:
    login(userData);

    // 3. REDIRECT:
    navigate('/dashboard'); 
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: 'background.default',
        py: 8 
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper 
          elevation={theme.palette.mode === 'dark' ? 8 : 4} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            bgcolor: 'background.paper', 
            borderRadius: theme.shape.borderRadius * 2,
          }}
        >
          {/* Icon and Title */}
          <Box 
            sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              bgcolor: 'secondary.main',
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 2 
            }}
          >
            <PersonAddOutlined />
          </Box>

          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            Create Your Account
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {/* Full Name Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              variant="outlined"
              value={formData.name} // <-- BIND VALUE
              onChange={handleInputChange} // <-- BIND HANDLER
            />
            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="outlined"
              value={formData.email} // <-- BIND VALUE
              onChange={handleInputChange} // <-- BIND HANDLER
            />
            {/* Password Field with Visibility Toggle */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'} 
              id="password"
              autoComplete="new-password"
              variant="outlined"
              sx={{ mb: 2 }}
              value={formData.password} // <-- BIND VALUE
              onChange={handleInputChange} // <-- BIND HANDLER
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            {/* Link to Login */}
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <MuiLink onClick={() => navigate('/login')} variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                {"Already have an account? Sign In"}
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;