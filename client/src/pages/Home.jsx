import { Container } from '@mui/system';
import MovieCard from '../components/MovieCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const { data } = await axios({
      url: '',
      method: '',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };
  return (
    <Box sx={{ marginTop: '20px' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
        >
          <MovieCard />
        </Grid>
      </Grid>
    </Box>
  );
}
