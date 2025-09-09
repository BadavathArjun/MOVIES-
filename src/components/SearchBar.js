import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  alpha,
  Menu,
  MenuItem,
  Chip,
  Typography
} from '@mui/material';
import {
  Search,
  FilterList,
  Clear,
  MovieFilter,
  TrendingUp
} from '@mui/icons-material';

const SearchBar = ({ onSearch, recentSearches = [], popularSearches = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtersAnchor, setFiltersAnchor] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    year: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, filters);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setFilters({ type: '', year: '' });
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion, filters);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    if (query.trim()) {
      onSearch(query, newFilters);
    }
    setFiltersAnchor(null);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const hasActiveFilters = filters.type || filters.year;

  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: 3,
          background: alpha('#fff', 0.95),
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
          }
        }}
      >
        <IconButton type="submit" sx={{ p: '10px', color: 'primary.main' }}>
          <Search />
        </IconButton>

        <InputBase
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies by title, genre, or actor..."
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          sx={{
            ml: 1,
            flex: 1,
            fontSize: '1.1rem',
            '& .MuiInputBase-input': {
              padding: '8px 0'
            }
          }}
        />

        {query && (
          <IconButton onClick={handleClear} sx={{ p: '10px' }}>
            <Clear />
          </IconButton>
        )}

        <IconButton
          onClick={(e) => setFiltersAnchor(e.currentTarget)}
          sx={{ p: '10px', color: hasActiveFilters ? 'primary.main' : 'inherit' }}
        >
          <FilterList />
        </IconButton>
      </Paper>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {filters.type && (
            <Chip
              label={`Type: ${filters.type}`}
              onDelete={() => handleFilterChange('type', '')}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          {filters.year && (
            <Chip
              label={`Year: ${filters.year}`}
              onDelete={() => handleFilterChange('year', '')}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (recentSearches.length > 0 || popularSearches.length > 0) && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 1000,
            maxHeight: 300,
            overflow: 'auto',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            borderRadius: 2
          }}
        >
          {recentSearches.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: 'text.secondary' }}>
                Recent Searches
              </Typography>
              {recentSearches.map((search, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  sx={{ py: 1.5 }}
                >
                  <Search sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                  {search}
                </MenuItem>
              ))}
            </Box>
          )}

          {popularSearches.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: 'text.secondary' }}>
                Popular Searches
              </Typography>
              {popularSearches.map((search, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  sx={{ py: 1.5 }}
                >
                  <TrendingUp sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                  {search}
                </MenuItem>
              ))}
            </Box>
          )}
        </Paper>
      )}

      {/* Filters Menu */}
      <Menu
        anchorEl={filtersAnchor}
        open={Boolean(filtersAnchor)}
        onClose={() => setFiltersAnchor(null)}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2
          }
        }}
      >
        <MenuItem disabled>
          <MovieFilter sx={{ mr: 1 }} />
          Filter by Type
        </MenuItem>
        {['movie', 'series', 'episode'].map((type) => (
          <MenuItem
            key={type}
            selected={filters.type === type}
            onClick={() => handleFilterChange('type', type)}
            sx={{ pl: 4 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </MenuItem>
        ))}

        <MenuItem disabled sx={{ mt: 1 }}>
          <MovieFilter sx={{ mr: 1 }} />
          Filter by Year
        </MenuItem>
        {years.map((year) => (
          <MenuItem
            key={year}
            selected={filters.year === year.toString()}
            onClick={() => handleFilterChange('year', year.toString())}
            sx={{ pl: 4 }}
          >
            {year}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SearchBar;