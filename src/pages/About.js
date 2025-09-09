import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        About Movies Catalog
      </Typography>
      <Typography variant="body1" paragraph>
        Movies Catalog is your go-to platform for discovering and managing your favorite movies and TV shows. Our mission is to provide a seamless and enjoyable experience for movie enthusiasts to explore, search, and organize their watchlists.
      </Typography>
      <Typography variant="body1" paragraph>
        We leverage the power of the OMDB API to bring you up-to-date movie information, ratings, and details. Whether you are a casual viewer or a cinephile, Movies Catalog has something for everyone.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Features
          </Typography>
          <ul>
            <li>Search movies by title, genre, or actor</li>
            <li>Create and manage personalized movie lists</li>
            <li>View detailed movie information and ratings</li>
            <li>User authentication and secure data storage</li>
          </ul>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6">Jane Doe</Typography>
              <Typography variant="body2">Lead Developer</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6">John Smith</Typography>
              <Typography variant="body2">UI/UX Designer</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          For inquiries or support, please email us at support@moviescatalog.com.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
