import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
  alpha
} from '@mui/material';
import {
  GitHub,
  Twitter,
  LinkedIn,
  Movie,
  Email,
  LocationOn,
  Favorite
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        mt: 8,
        pt: 6,
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)'
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Movies Catalog
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Discover, organize, and enjoy your favorite movies. Create custom collections and never forget what to watch next.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  background: alpha('#fff', 0.1),
                  '&:hover': {
                    background: alpha('#fff', 0.2),
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  background: alpha('#fff', 0.1),
                  '&:hover': {
                    background: alpha('#fff', 0.2),
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  background: alpha('#fff', 0.1),
                  '&:hover': {
                    background: alpha('#fff', 0.2),
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Home
              </Link>
              <Link
                href="/search"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Search
              </Link>
              <Link
                href="/lists"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                My Lists
              </Link>
              <Link
                href="/dashboard"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Dashboard
              </Link>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/about"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                About
              </Link>
              <Link
                href="/privacy"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Terms of Service
              </Link>
              <Link
                href="/help"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Help Center
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Get in Touch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  contact@moviescatalog.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Lb Nagar, Hyd
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, background: alpha('#fff', 0.2) }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Movies Catalog. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Made with
            </Typography>
            <Favorite sx={{ color: '#FF6B6B', fontSize: 16 }} />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              for movie lovers
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Powered by OMDb API & Firebase
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;