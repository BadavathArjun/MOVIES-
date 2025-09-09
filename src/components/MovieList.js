import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Container,
  Pagination,
  alpha,
  Paper,
  Fade
} from '@mui/material';
import { LocalMovies, SearchOff } from '@mui/icons-material';
import MovieCard from './MovieCard';

const MovieList = ({ movies, currentPage = 1, totalPages = 1, onPageChange, loading = false }) => {
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  height: 400,
                  borderRadius: 3,
                  background: alpha('#f5f5f5', 0.6),
                  animation: 'pulse 1.5s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.6 },
                    '50%': { opacity: 0.8 },
                    '100%': { opacity: 0.6 }
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          px: 2
        }}
      >
        <SearchOff sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
        <Typography variant="h5" component="h3" gutterBottom color="text.secondary">
          No movies found
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 400 }}>
          Try adjusting your search criteria or browse different categories
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Results Count */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="h2" color="text.secondary">
          <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {movies.length}
          </Box>{' '}
          {movies.length === 1 ? 'movie' : 'movies'} found
        </Typography>
        
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
                fontWeight: 'bold'
              }
            }}
          />
        )}
      </Box>

      {/* Movies Grid */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        {movies.map((movie, index) => (
          <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={movie.imdbID}>
            <Box>
              <MovieCard movie={movie} />
            </Box>
          </Fade>
        ))}
      </Box>

      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                minWidth: 40,
                height: 40
              }
            }}
          />
        </Box>
      )}

      {/* Results Summary */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          background: alpha('#f5f5f5', 0.5),
          textAlign: 'center'
        }}
      >
        <LocalMovies sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
        <Typography variant="body1" color="text.secondary">
          Showing {movies.length} of many great movies
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Keep exploring to discover more amazing titles
        </Typography>
      </Paper>
    </Box>
  );
};

export default MovieList;