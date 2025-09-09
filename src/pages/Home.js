import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Chip,
  alpha
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { searchMovies } from '../api/omdb';
import { MovieFilter, TrendingUp, LocalMovies } from '@mui/icons-material';

const randomQueries = ['action', 'comedy', 'drama', 'thriller', 'romance', 'sci-fi', 'adventure', 'fantasy'];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRandomMovies = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
      const data = await searchMovies(randomQuery);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setSearchQuery('');
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to load movies. Please try again.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRandomMovies();
  }, [fetchRandomMovies]);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      fetchRandomMovies();
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await searchMovies(query);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setSearchQuery(query);
      } else {
        setMovies([]);
        setError(data.Error);
        setSearchQuery(query);
      }
    } catch (err) {
      setError('Failed to search movies. Please try again.');
    }
    setLoading(false);
  }, [fetchRandomMovies]);

  const handleClearSearch = () => {
    fetchRandomMovies();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'white'
          }}
        >
          <LocalMovies 
            sx={{ 
              fontSize: 60, 
              mb: 2,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }} 
          />
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 1
            }}
          >
            Movie Catalog
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto',
              mb: 3
            }}
          >
            Discover your next favorite movie from our extensive collection
          </Typography>
        </Box>

        {/* Search Section */}
        <Paper
          elevation={10}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 3,
            background: alpha('#fff', 0.95),
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <SearchBar onSearch={handleSearch} />
            
            {searchQuery && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Chip
                  label={`Search results for: "${searchQuery}"`}
                  onDelete={handleClearSearch}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 'medium' }}
                />
              </Box>
            )}
          </Box>
        </Paper>

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8
            }}
          >
            <CircularProgress 
              size={60} 
              thickness={4}
              sx={{ 
                color: 'white',
                mb: 2
              }} 
            />
            <Typography variant="h6" color="white">
              Searching our movie database...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            <Alert 
              severity="error" 
              variant="filled"
              sx={{
                borderRadius: 2,
                fontSize: '1.1rem',
                alignItems: 'center'
              }}
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* Movie Results Section */}
        {!loading && movies.length > 0 && (
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 3,
              background: alpha('#fff', 0.95),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              {searchQuery ? (
                <>
                  <MovieFilter sx={{ mr: 1, fontSize: 30, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Search Results
                  </Typography>
                </>
              ) : (
                <>
                  <TrendingUp sx={{ mr: 1, fontSize: 30, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Popular Movies
                  </Typography>
                </>
              )}
            </Box>
            
            <MovieList movies={movies} />
          </Paper>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && !error && (
          <Paper
            elevation={10}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              background: alpha('#fff', 0.95),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Typography variant="h5" component="h3" gutterBottom color="text.secondary">
              No movies found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try searching for something else or browse our popular categories
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
              {randomQueries.slice(0, 6).map((query) => (
                <Grid item key={query}>
                  <Chip
                    label={query.charAt(0).toUpperCase() + query.slice(1)}
                    onClick={() => handleSearch(query)}
                    variant="outlined"
                    color="primary"
                    clickable
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
            Discover thousands of movies with our powerful search
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;