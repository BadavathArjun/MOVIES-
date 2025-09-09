import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Divider,
  IconButton,
  alpha,
  Paper
} from '@mui/material';
import {
  Close,
  PlaylistAdd,
  Add,
  ArrowBack,
  Collections
} from '@mui/icons-material';
import { getUserLists, createList, addMovieToList } from '../firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const AddToListModal = ({ movie, onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      if (currentUser) {
        try {
          const userLists = await getUserLists(currentUser.uid);
          setLists(userLists);
          if (userLists.length > 0) {
            setSelectedList(userLists[0].id);
          }
        } catch (err) {
          setError('Failed to load lists');
        }
      }
    };
    fetchLists();
  }, [currentUser]);

  const handleAddToList = async () => {
    if (!selectedList) return;
    setLoading(true);
    setError('');
    try {
      await addMovieToList(currentUser.uid, selectedList, movie);
      onSuccess();
      // Refetch lists to update UI if needed
      const userLists = await getUserLists(currentUser.uid);
      setLists(userLists);
      onClose();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    setLoading(true);
    setError('');
    try {
      const newListId = await createList(currentUser.uid, newListName);
      // Refetch lists after creating new list for fresh data and better performance
      const userLists = await getUserLists(currentUser.uid);
      setLists(userLists);
      setSelectedList(newListId);
      setNewListName('');
      setIsCreating(false);
    } catch (err) {
      setError('Failed to create list');
    }
    setLoading(false);
  };

  const handleClose = () => {
    setError('');
    setNewListName('');
    setIsCreating(false);
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)'
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        position: 'relative'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PlaylistAdd sx={{ mr: 1 }} />
          <Typography variant="h6" component="span">
            Add to List
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white'
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Movie Info */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            background: alpha('#fff', 0.8)
          }}
        >
          <Box
            component="img"
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
            alt={movie.Title}
            sx={{
              width: 60,
              height: 90,
              objectFit: 'cover',
              borderRadius: 1,
              mr: 2
            }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {movie.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.Year} • {movie.Type}
            </Typography>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {!isCreating ? (
          <>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="list-select-label">Choose a list</InputLabel>
              <Select
                labelId="list-select-label"
                value={selectedList}
                label="Choose a list"
                onChange={(e) => setSelectedList(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {lists.map(list => (
                  <MenuItem key={list.id} value={list.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Collections sx={{ mr: 1, color: 'primary.main' }} />
                      {list.name}
                      {list.isDefault && (
                        <Typography variant="caption" sx={{ ml: 1, color: 'primary.main' }}>
                          (Default)
                        </Typography>
                      )}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setIsCreating(true)}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              Create New List
            </Button>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton
                onClick={() => setIsCreating(false)}
                size="small"
                sx={{ mr: 1 }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h6">Create New List</Typography>
            </Box>

            <TextField
              fullWidth
              label="List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter a name for your new list"
              sx={{ mb: 3 }}
              autoFocus
            />
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        {!isCreating ? (
          <Button
            onClick={handleAddToList}
            disabled={loading || lists.length === 0}
            variant="contained"
            fullWidth
            size="large"
            startIcon={loading ? <CircularProgress size={20} /> : <PlaylistAdd />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)'
            }}
          >
            {loading ? 'Adding...' : 'Add to List'}
          </Button>
        ) : (
          <Button
            onClick={handleCreateList}
            disabled={loading || !newListName.trim()}
            variant="contained"
            fullWidth
            size="large"
            startIcon={loading ? <CircularProgress size={20} /> : <Add />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
            }}
          >
            {loading ? 'Creating...' : 'Create List'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddToListModal;