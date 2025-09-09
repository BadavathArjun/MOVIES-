import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Movie
} from '@mui/icons-material';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup, login, logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await signup(email, password, displayName);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTabChange = (event, newValue) => {
    setIsSignUp(newValue === 1);
    setError('');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (currentUser) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          px: 2
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            maxWidth: 450,
            width: '100%',
            textAlign: 'center',
            background: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)'
          }}
        >
          <Movie sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Welcome back!
          </Typography>
          <Typography variant="h6" gutterBottom>
            {currentUser.displayName || currentUser.email}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You're all set to explore our movie collection.
          </Typography>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Sign Out
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        px: 2
      }}
    >
      <Paper
        elevation={16}
        sx={{
          width: '100%',
          maxWidth: 450,
          overflow: 'hidden',
          borderRadius: 2
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            py: 3,
            textAlign: 'center'
          }}
        >
          <Movie sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Movie Catalog
          </Typography>
          <Typography variant="subtitle1">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </Typography>
        </Box>

        <Tabs
          value={isSignUp ? 1 : 0}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit} sx={{ px: 4, pb: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {isSignUp && (
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                )
              }}
            />
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isSignUp ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </Button>

          <Divider sx={{ my: 2 }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </Paper>

      <Typography variant="body2" sx={{ mt: 3, color: 'white' }}>
        © {new Date().getFullYear()} Movie Catalog. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Auth;