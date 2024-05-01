import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  list: [],
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, actions) => {
      state.list = actions.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setMovies } = movieSlice.actions;
export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: 'http://localhost:3000/movies',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(setMovies(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const addMovie = (movieData, navigate) => {
  return async () => {
    try {
      await axios({
        url: 'http://localhost:3000/movies',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: movieData,
      });
      navigate('/my-movies');
    } catch (error) {
      console.log(error);
    }
  };
};

export default movieSlice.reducer;
