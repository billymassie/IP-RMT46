import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './features/movie/movieSlice';
import myMovieReducer from './features/movie/myMovieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    myMovies: myMovieReducer,
  },
});
