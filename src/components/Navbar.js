import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  alpha,
  useScrollTrigger,
  Slide,
  Container
} from '@mui/material';
import {
  Movie,
  AccountCircle,
  ExitToApp,
  Dashboard,
  Collections,
  Menu as MenuIcon,
  KeyboardArrowDown
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const trigger = useScrollTrigger({
    threshold: 50
  });

  const handleLogout = async () => {
    try {
      await logout();
      handleCloseMenu();
      navigate('/');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="sticky"
          elevation={trigger ? 4 : 0}
          sx={{
            background: trigger 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
            py: 0.5
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
              {/* Logo/Brand */}
              <Box
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  mr: 4
                }}
              >
                <Movie sx={{ fontSize: 32, mr: 1 }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  Movies Catalog
                </Typography>
              </Box>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                {currentUser ? (
                  <>
                    <Button
                      component={Link}
                      to="/dashboard"
                      color="inherit"
                      startIcon={<Dashboard />}
                      sx={{
                        fontWeight: 'bold',
                        '&:hover': {
                          background: alpha('#fff', 0.1)
                        }
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      component={Link}
                      to="/lists"
                      color="inherit"
                      startIcon={<Collections />}
                      sx={{
                        fontWeight: 'bold',
                        '&:hover': {
                          background: alpha('#fff', 0.1)
                        }
                      }}
                    >
                      My Lists
                    </Button>

                    {/* User Profile Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        avatar={
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            {getInitials(currentUser.displayName || currentUser.email)}
                          </Avatar>
                        }
                        label={
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 'medium' }}>
                            {currentUser.displayName || currentUser.email.split('@')[0]}
                          </Typography>
                        }
                        onClick={handleProfileMenuOpen}
                        deleteIcon={<KeyboardArrowDown />}
                        onDelete={handleProfileMenuOpen}
                        sx={{
                          background: alpha('#fff', 0.1),
                          '&:hover': {
                            background: alpha('#fff', 0.2)
                          }
                        }}
                      />
                    </Box>
                  </>
                ) : (
                  <Button
                    component={Link}
                    to="/auth"
                    color="inherit"
                    variant="outlined"
                    startIcon={<AccountCircle />}
                    sx={{
                      borderColor: alpha('#fff', 0.3),
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        background: alpha('#fff', 0.1)
                      }
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                onClick={handleMobileMenuOpen}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      {/* Desktop Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }
        }}
      >
        <MenuItem onClick={handleCloseMenu} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Signed in as
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {currentUser?.email}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ExitToApp sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }
        }}
      >
        {currentUser ? (
          <>
            <MenuItem 
              component={Link} 
              to="/dashboard" 
              onClick={handleCloseMenu}
            >
              <Dashboard sx={{ mr: 1 }} />
              Dashboard
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/lists" 
              onClick={handleCloseMenu}
            >
              <Collections sx={{ mr: 1 }} />
              My Lists
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ExitToApp sx={{ mr: 1 }} />
              Sign Out
            </MenuItem>
          </>
        ) : (
          <MenuItem 
            component={Link} 
            to="/auth" 
            onClick={handleCloseMenu}
          >
            <AccountCircle sx={{ mr: 1 }} />
            Sign In
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Navbar;