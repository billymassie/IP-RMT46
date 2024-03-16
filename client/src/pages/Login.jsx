import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const { data } = await axios({
        url: 'http://localhost:3000/users/login',
        method: 'POST',
        data: {
          email: formData.get('email'),
          password: formData.get('password'),
        },
      });
      localStorage.setItem('token', data.access_token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const handleCredentialResponse = async ({ credential }) => {
    const { data } = await axios({
      url: 'http://localhost:3000/users/google-login',
      method: 'POST',
      data: { googleToken: credential },
    });
    localStorage.setItem('token', data.access_token);
    navigate('/');
  };
  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          '1044543553547-3h6opkof2adsl9nd2hgqolk08lgr34qq.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large' } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  return (
    <Container sx={{ height: '80vh', display: 'flex' }}>
      <Grid
        xs={12}
        sm={8}
        md={5}
        item
        component={Paper}
        elevation={6}
        sx={{
          padding: '25px',
          margin: 'auto',
          maxWidth: '25vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            component='h1'
            variant='h5'
          >
            Sign in
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 2, mb: 2 }}
            >
              Login
            </Button>
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
              <div id='buttonDiv'></div>
            </Container>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
