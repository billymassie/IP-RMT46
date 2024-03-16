import MovieCard from '../components/MovieCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, removeMovie } from '../features/movie/myMovieSlice';
import BasicModal from '../components/Modal';
import axios from 'axios';
import { Button } from '@mui/material';

export default function MyMovie() {
  const [userId, setUserId] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const myMovies = useSelector((state) => state.myMovies.list);
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const handleSelectChange = (event) => {
    event.preventDefault();
    setUserId(event.target.value);
  };

  const handleOpenModal = (movieId) => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/users/list',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
    setOpenModal(true);
    setMovieId(movieId);
  };
  const handleSubmitModal = async () => {
    try {
      const { data } = await axios({
        url: `http://localhost:3000/users/my-movies/${movieId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { UserId: userId },
      });
      dispatch(fetchMovies());
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (movieId) => {
    dispatch(removeMovie(movieId));
  };
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
                    handleClick={() => handleOpenModal(data.id)}
                  >
                    <Button
                      size='small'
                      color='primary'
                      onClick={() => handleRemove(data.id)}
                    >
                      Remove
                    </Button>
                  </MovieCard>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <BasicModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        userList={userList}
        handleSelectChange={handleSelectChange}
        userId={userId}
        handleSubmit={handleSubmitModal}
      />
    </>
  );
}
