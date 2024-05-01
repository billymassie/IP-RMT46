import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink, redirect, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        style={{ backgroundColor: '#891652', borderRadius: '18px' }}
      >
        <Toolbar
          style={{
            justifyContent: 'space-between',
          }}
        >
          <Stack
            direction={'row'}
            spacing={4}
          >
            <NavLink to='/'>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1 }}
              >
                Home
              </Typography>
            </NavLink>
            <NavLink to='/my-movies'>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1 }}
              >
                My Movie
              </Typography>
            </NavLink>
          </Stack>
          <Button
            color='inherit'
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
