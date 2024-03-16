import MovieCard from '../components/MovieCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Home() {
  const [movies, setMovies] = useState();
  const fetchMovies = async () => {
    try {
      const { data } = await axios({
        url: 'http://localhost:3000/movies',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovies();
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
