import MovieCard from '../components/MovieCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, fetchMovies } from '../features/movie/movieSlice';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);

  const handleAddMovie = async (movieData) => {
    dispatch(addMovie(movieData, navigate));
  };
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  return (
    <Box sx={{ marginTop: '20px' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {movies &&
          movies.map((data) => {
            return (
              <Grid
                key={data.tmdbId}
                item
                xs={2}
                sm={4}
                md={4}
              >
                <MovieCard
                  title={data.title}
                  posterUrl={data.posterUrl}
                  overview={data.overview}
                  btnCaption={'Add to favorite'}
                  handleClick={() => handleAddMovie(data)}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
