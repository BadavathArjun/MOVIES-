import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}?s=${query}&page=${page}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
