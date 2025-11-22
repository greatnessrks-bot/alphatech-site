// src/components/auth/LoginModal.jsx

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
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // <-- NEW: Import Auth Hook

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // --- NEW: State for form inputs (Email and Password) ---
  const [formData, setFormData] = useState({
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
    console.log('Login attempt successful! User:', formData.email);

    // 1. MOCK API CALL SUCCESS: (Replace this with your actual API call later)
    //    Here you would verify credentials with your backend.
    
    // 2. CREATE USER DATA (mock):
    //    Typically, the server returns the user data needed for the session.
    const userData = {
      id: 'login-' + Date.now(),
      email: formData.email,
    };
    
    // 3. UPDATE GLOBAL AUTH STATE:
    login(userData); // This logs the user in and saves the state.

    // 4. REDIRECT:
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
              bgcolor: 'primary.main', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 2 
            }}
          >
            <LockOutlined />
          </Box>

          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            Sign In to Your Account
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
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
              Sign In
            </Button>

            {/* Links */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <MuiLink href="#" variant="body2" color="primary">
                Forgot password?
              </MuiLink>
              <MuiLink onClick={() => navigate('/signup')} variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;