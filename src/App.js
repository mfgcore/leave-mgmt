import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { verifyToken } from './services/leaveService';
import { useUser } from './UserContext';
import LeaveBalance from './components/LeaveBalance';
import LeaveRequest from './components/LeaveRequest';
import Login from './components/Login';
import NotFound from './components/NotFound';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const location = useLocation();

  useEffect(() => {
    console.log('useEffect in App.js triggered');
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    const tokenFromLocalStorage = localStorage.getItem('token');
    const token = tokenFromUrl || tokenFromLocalStorage;

    if (token) {
      const verifyUserToken = async () => {
        console.log('Verifying token:', token);
        try {
          const response = await verifyToken(token);
          setUser({ token, ...response.data });
          if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
          }
        } catch (error) {
          setError('Invalid or expired token');
          localStorage.removeItem('token');
        } finally {
          setLoading(false);
        }
      };

      verifyUserToken();
    } else {
      setError('No token provided');
      setLoading(false);
    }
  }, [location.search, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/leave-balance" />} />
      <Route path="/leave-balance" element={<LeaveBalance />} />
      <Route path="/leave-request" element={<LeaveRequest />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
