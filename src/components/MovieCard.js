import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  alpha,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Visibility,
  CalendarToday,
  Theaters
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onToggleFavorite, isFavorite = false }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
  };

  const posterUrl = imageError || !movie.Poster || movie.Poster === 'N/A'
    ? null
    : movie.Poster;

  return (
    <Card
      sx={{
        height: 500,
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? 8 : 4,
        borderRadius: 3,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
        '&:hover': {
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image with Overlay */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {posterUrl ? (
          <CardMedia
            component="img"
            height="320"
            image={posterUrl}
            alt={movie.Title}
            onError={handleImageError}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        ) : (
          <Box
            sx={{
              height: 320,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
              color: '#666',
              fontSize: '14px',
              textAlign: 'center',
              p: 2
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                fontSize: '24px'
              }}
            >
              🎬
            </Box>
            <Box sx={{ fontWeight: 'bold', mb: 1 }}>No Image</Box>
            <Box sx={{ fontSize: '12px', opacity: 0.7 }}>Available</Box>
          </Box>
        )}
        
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
        
        {/* Year Badge */}
        <Chip
          label={movie.Year}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: 2
          }}
          icon={<CalendarToday sx={{ fontSize: 16, color: 'white' }} />}
        />
        
        {/* Type Badge */}
        <Chip
          label={movie.Type?.charAt(0).toUpperCase() + movie.Type?.slice(1)}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'linear-gradient(45deg, #FF6B35 30%, #FF8E53 90%)',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: 2
          }}
          icon={<Theaters sx={{ fontSize: 16, color: 'white' }} />}
        />
        
        {/* Favorite Button */}
        {onToggleFavorite && (
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <IconButton
              onClick={handleToggleFavorite}
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                background: alpha('#fff', 0.9),
                '&:hover': {
                  background: '#fff'
                },
                boxShadow: 2
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ color: '#FF6B6B' }} />
              ) : (
                <FavoriteBorder sx={{ color: '#666' }} />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            lineHeight: 1.3,
            minHeight: '2.6em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: 'text.primary'
          }}
        >
          {movie.Title}
        </Typography>

        {/* Rating (if available) */}
        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              value={parseFloat(movie.imdbRating) / 2}
              precision={0.1}
              readOnly
              size="small"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              {movie.imdbRating}/10
            </Typography>
          </Box>
        )}

        {/* Additional Info */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            component={Link}
            to={`/movie/${movie.imdbID}`}
            variant="contained"
            fullWidth
            size="large"
            startIcon={<Visibility />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              fontWeight: 'bold',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;