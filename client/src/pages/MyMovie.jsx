import MovieCard from '../components/MovieCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/movie/myMovieSlice';

export default function MyMovie() {
  const dispatch = useDispatch();
  const myMovies = useSelector((state) => state.myMovies.list);
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  return (
    <>
      <Box sx={{ marginTop: '20px' }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {myMovies &&
            myMovies.map((data) => {
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
                    btnCaption={'Gift'}
                    handleClick={() => handleAddMovie(data)}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}
