import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';
import Box from '@mui/material/Box';
import Header from '../components/Header';

const ProtectedRoutes = () => {
  const { accessToken } = useAuth();

  // Check if the user is authenticated
  if (!accessToken) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If authenticated, render the child routes
  return (
    <>
      <Header />
      <Box flex={1}>
        <Outlet />
      </Box>
    </>
  );
};

export default ProtectedRoutes;
