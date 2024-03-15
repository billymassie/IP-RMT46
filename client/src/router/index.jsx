import { createBrowserRouter } from 'react-router-dom';
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
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/my-movies',
        element: <MyMovie />,
      },
    ],
  },
]);

export default router;
