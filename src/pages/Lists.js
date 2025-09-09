import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  alpha,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Tooltip
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getUserLists, getListMovies, removeMovieFromList } from '../firebase/firestore';
import {
  DeleteOutline,
  PlaylistAddCheck,
  Collections,
  Visibility,
  Add
} from '@mui/icons-material';

const Lists = () => {
  const { currentUser } = useAuth();
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLists([]);
      setSelectedListId(null);
      setMovies([]);
      return;
    }
    const fetchLists = async () => {
      setLoadingLists(true);
      setError('');
      try {
        const userLists = await getUserLists(currentUser.uid);
        setLists(userLists);
        if (userLists.length > 0) {
          setSelectedListId(userLists[0].id);
        }
      } catch (err) {
        setError('Failed to load lists');
      }
      setLoadingLists(false);
    };
    fetchLists();
  }, [currentUser]);

  useEffect(() => {
    if (!selectedListId) {
      setMovies([]);
      return;
    }
    const fetchMovies = async () => {
      setLoadingMovies(true);
      setError('');
      try {
        const listMovies = await getListMovies(currentUser.uid, selectedListId);
        setMovies(listMovies);
      } catch (err) {
        setError('Failed to load movies in list');
      }
      setLoadingMovies(false);
    };
    fetchMovies();
  }, [selectedListId, currentUser]);

  const handleRemoveMovie = async (movieId) => {
    try {
      await removeMovieFromList(currentUser.uid, selectedListId, movieId);
      setMovies(movies.filter(movie => movie.imdbID !== movieId));
      setDeleteConfirmOpen(false);
    } catch (err) {
      alert('Failed to remove movie from list');
    }
  };

  const openDeleteConfirm = (movie) => {
    setMovieToDelete(movie);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setMovieToDelete(null);
  };

  const selectedList = lists.find(list => list.id === selectedListId);

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
          <PlaylistAddCheck sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="primary">
            Sign In Required
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please sign in to view and manage your movie lists.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: 2 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Collections sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
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
          My Movie Lists
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your personal movie collections
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Lists Navigation */}
      <Paper
        elevation={4}
        sx={{
          mb: 4,
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <Tabs
          value={selectedListId || false}
          onChange={(event, newValue) => setSelectedListId(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            background: 'linear-gradient(45deg, #f5f5f5, #e8eaf6)',
            '& .MuiTab-root': {
              fontWeight: 'bold',
              fontSize: '1rem',
              minHeight: 64,
              opacity: 0.8,
              '&.Mui-selected': {
                opacity: 1,
                color: 'primary.main'
              }
            }
          }}
        >
          {lists.map(list => (
            <Tab
              key={list.id}
              value={list.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {list.isDefault && <PlaylistAddCheck fontSize="small" />}
                  {list.name}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Selected List Header */}
      {selectedList && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: alpha('#2196F3', 0.05)
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                {selectedList.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in this collection
              </Typography>
            </Box>
            {selectedList.isDefault && (
              <Chip
                icon={<PlaylistAddCheck />}
                label="Default List"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        </Paper>
      )}

      {/* Movies Grid */}
      {loadingMovies ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : movies.length === 0 ? (
        <Paper
          elevation={4}
          sx={{
            p: 8,
            textAlign: 'center',
            borderRadius: 3,
            background: alpha('#f5f5f5', 0.5)
          }}
        >
          <PlaylistAddCheck sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom color="text.secondary">
            No movies in this list yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start adding movies to build your collection
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8
                  }
                }}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.poster !== 'N/A' ? movie.poster : '/placeholder-movie.png'}
                    alt={movie.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom noWrap>
                      {movie.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip
                        label={movie.year}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                      <Chip
                        label={movie.type}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Added: {new Date(movie.addedAt?.toDate()).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Tooltip title="Remove from list">
                    <IconButton
                      color="error"
                      onClick={() => openDeleteConfirm(movie)}
                      size="large"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={closeDeleteConfirm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Remove Movie
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove "{movieToDelete?.title}" from your list?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm}>Cancel</Button>
          <Button
            onClick={() => handleRemoveMovie(movieToDelete?.imdbID)}
            color="error"
            variant="contained"
            startIcon={<DeleteOutline />}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Lists;