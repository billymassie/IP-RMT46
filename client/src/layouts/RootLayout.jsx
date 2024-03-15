import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Container } from '@mui/material';

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <Container>
        {/* Kita render anak routingannya di sini */}
        <Outlet />
        {/* Kita render anak routingannya di sini */}
      </Container>
    </>
  );
}
