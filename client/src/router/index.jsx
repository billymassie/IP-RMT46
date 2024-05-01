import { createBrowserRouter, redirect } from 'react-router-dom';
import Home from '../pages/Home';
import MyMovie from '../pages/MyMovie';
import Login from '../pages/Login';
import RootLayout from '../layouts/RootLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <RootLayout />,
    loader: () => {
      return !localStorage.getItem('token') ? redirect('/login') : null;
    },
    children: [
      {
        path: '/',
        element: <Home />,
        loader: () => {
          return !localStorage.getItem('token') ? redirect('/login') : null;
        },
      },
      {
        path: '/my-movies',
        element: <MyMovie />,
        loader: () => {
          return !localStorage.getItem('token') ? redirect('/login') : null;
        },
      },
    ],
  },
]);

export default router;
