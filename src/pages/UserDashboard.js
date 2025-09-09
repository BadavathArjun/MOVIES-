import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  alpha,
  IconButton
} from '@mui/material';
import {
  Dashboard,
  PlaylistAdd,
  Movie,
  Refresh,
  TrendingUp,
  Collections,
  AccountCircle,
  ArrowForward
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getUserLists, getListMovies } from '../firebase/firestore';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [lists, setLists] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    fetchDashboardData();
  }, [currentUser]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const userLists = await getUserLists(currentUser.uid);
      setLists(userLists);

      let movieCount = 0;
      for (const list of userLists) {
        const movies = await getListMovies(currentUser.uid, list.id);
        movieCount += movies.length;
      }
      setTotalMovies(movieCount);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
    setLoading(false);
    setRefreshing(false);
  };

  if (!currentUser) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          px: 2
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            textAlign: 'center',
            maxWidth: 500,
            width: '100%',
            background: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)'
          }}
        >
          <AccountCircle sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="primary">
            Sign In Required
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please sign in to view your dashboard.
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Dashboard sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          User Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome back, {currentUser.displayName || currentUser.email}!
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={4}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Collections sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" component="div" fontWeight="bold">
                  {lists.length}
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom>
                Total Lists
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Your personal movie collections
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={4}
            sx={{
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              color: 'white',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Movie sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" component="div" fontWeight="bold">
                  {totalMovies}
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom>
                Total Movies
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Across all your lists
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            elevation={4}
            sx={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
              color: 'white',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" component="div" fontWeight="bold">
                  Active
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom>
                Account Status
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Premium movie enthusiast
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 6,
          borderRadius: 3,
          background: alpha('#f5f5f5', 0.5)
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Movie />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              }}
            >
              Browse Movies
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              component={Link}
              to="/lists"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Collections />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)'
              }}
            >
              Manage Lists
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              onClick={fetchDashboardData}
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Refresh />}
              disabled={refreshing}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)'
              }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Your Lists Section */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          background: alpha('#fff', 0.9)
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" component="h2">
            Your Lists
          </Typography>
          <Chip
            label={`${lists.length} list${lists.length !== 1 ? 's' : ''}`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {lists.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <PlaylistAdd sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="text.secondary">
              No lists yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start creating collections of your favorite movies
            </Typography>
            <Button
              component={Link}
              to="/lists"
              variant="contained"
              startIcon={<Collections />}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              }}
            >
              Create Your First List
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {lists.map((list) => (
              <Grid item xs={12} sm={6} md={4} key={list.id}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Collections color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="h3" noWrap>
                        {list.name}
                      </Typography>
                    </Box>
                    {list.isDefault && (
                      <Chip
                        label="Default"
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 2 }}
                      />
                    )}
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Created: {new Date(list.createdAt?.toDate()).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={Link}
                      to="/lists"
                      fullWidth
                      variant="outlined"
                      endIcon={<ArrowForward />}
                    >
                      View List
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default UserDashboard;