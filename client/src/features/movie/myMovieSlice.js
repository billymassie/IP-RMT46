import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  list: [],
};

export const myMovieSlice = createSlice({
  name: 'myMovies',
  initialState,
  reducers: {
    setMovies: (state, actions) => {
      state.list = actions.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setMovies } = myMovieSlice.actions;
export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: 'http://localhost:3000/users/my-movies',
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
export const removeMovie = (movieId) => {
  return async (dispatch) => {
    try {
      const data = await axios({
        url: `http://localhost:3000/users/my-movies/${movieId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(fetchMovies());
    } catch (error) {
      console.log(error);
    }
  };
};

export default myMovieSlice.reducer;
