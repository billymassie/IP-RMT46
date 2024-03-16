import MovieCard from '../components/MovieCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movie/movieSlice';

export default function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);

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
          movies.map((e) => {
            return (
              <Grid
                key={e.tmdbId}
                item
                xs={2}
                sm={4}
                md={4}
              >
                <MovieCard
                  title={e.title}
                  posterUrl={e.posterUrl}
                  overview={e.overview}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
