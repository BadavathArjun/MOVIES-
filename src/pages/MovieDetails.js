import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  Card,
  CardContent,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  ArrowBack,
  PlaylistAdd,
  CalendarToday,
  Schedule,
  Theaters,
  Person,
  Star,
  Language,
  Flag
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api/omdb';
import { useAuth } from '../contexts/AuthContext';
import AddToListModal from '../components/AddToListModal';

const MovieDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  const handleAddToList = () => {
    if (!currentUser) {
      alert('Please sign in to add movies to your lists.');
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddSuccess = () => {
    // You could replace this with a snackbar notification
    console.log('Movie added to list successfully!');
  };

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

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <ArrowBack sx={{ mr: 0.5 }} fontSize="small" />
          Back to Search
        </Link>
        <Typography color="text.primary">Movie Details</Typography>
      </Breadcrumbs>

      <Paper
        elevation={6}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)'
        }}
      >
        <Grid container>
          {/* Poster Section */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
              alt={movie.Title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                minHeight: 500
              }}
            />
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={8}>
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              {/* Title and Year */}
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
                {movie.Title} ({movie.Year})
              </Typography>

              {/* Ratings */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <Chip
                    icon={<Star />}
                    label={`IMDb: ${movie.imdbRating}/10`}
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 'bold' }}
                  />
                )}
                <Chip
                  label={movie.Rated}
                  color="secondary"
                  variant="outlined"
                />
                <Chip
                  label={movie.Runtime}
                  variant="outlined"
                />
              </Box>

              {/* Action Button */}
              <Button
                variant="contained"
                size="large"
                startIcon={<PlaylistAdd />}
                onClick={handleAddToList}
                sx={{
                  mb: 3,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #FF6B35 30%, #FF8E53 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #E55A2E 30%, #FF7C40 90%)'
                  }
                }}
              >
                Add to List
              </Button>

              <Divider sx={{ my: 3 }} />

              {/* Movie Details Grid */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <DetailItem
                    icon={<CalendarToday />}
                    title="Released"
                    value={movie.Released}
                  />
                  <DetailItem
                    icon={<Theaters />}
                    title="Genre"
                    value={movie.Genre}
                  />
                  <DetailItem
                    icon={<Person />}
                    title="Director"
                    value={movie.Director}
                  />
                  <DetailItem
                    icon={<Language />}
                    title="Language"
                    value={movie.Language}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DetailItem
                    icon={<Schedule />}
                    title="Runtime"
                    value={movie.Runtime}
                  />
                  <DetailItem
                    icon={<Flag />}
                    title="Country"
                    value={movie.Country}
                  />
                  <DetailItem
                    icon={<Star />}
                    title="IMDb Votes"
                    value={movie.imdbVotes}
                  />
                  <DetailItem
                    icon={<Theaters />}
                    title="Type"
                    value={movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
                  />
                </Grid>
              </Grid>

              {/* Plot */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Plot
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                  {movie.Plot}
                </Typography>
              </Box>

              {/* Actors */}
              {movie.Actors && movie.Actors !== 'N/A' && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Cast
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {movie.Actors.split(', ').map((actor, index) => (
                      <Chip
                        key={index}
                        label={actor}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Ratings */}
              {movie.Ratings && movie.Ratings.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Ratings
                  </Typography>
                  <Grid container spacing={2}>
                    {movie.Ratings.map((rating, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle2" color="primary">
                              {rating.Source}
                            </Typography>
                            <Typography variant="h6">
                              {rating.Value}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Add to List Modal */}
      {showModal && (
        <AddToListModal
          movie={movie}
          onClose={handleCloseModal}
          onSuccess={handleAddSuccess}
        />
      )}
    </Container>
  );
};

// Helper component for detail items
const DetailItem = ({ icon, title, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Box sx={{ color: 'primary.main', mr: 2 }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {value !== 'N/A' ? value : 'Not available'}
      </Typography>
    </Box>
  </Box>
);

export default MovieDetails;