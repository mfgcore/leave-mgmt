import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { verifyToken } from './services/leaveService';
import { useUser } from './UserContext';
import LeaveBalance from './components/LeaveBalance';
import LeaveRequest from './components/LeaveRequest';
import Login from './components/Login';
import NotFound from './components/NotFound';

const App = () => {
  const { user, loading, setUser } = useUser();
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // Add authenticated state
  const location = useLocation();

  useEffect(() => {
    console.log('useEffect in App.js triggered');
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    const tokenFromLocalStorage = localStorage.getItem('token');
    const token = tokenFromUrl || tokenFromLocalStorage;

    console.log('Token for verification:', token);

    if (token) {
      const verifyUserToken = async () => {
        console.log('Verifying token:', token);
        try {
          const response = await verifyToken(token);
          setUser({ token, ...response.data });
          setAuthenticated(true); // Set authenticated to true on successful verification
          if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            console.log('Token set in localStorage from URL:', tokenFromUrl);
          }
          console.log('User set in context:', response.data);
        } catch (error) {
          setError('Invalid or expired token');
          localStorage.removeItem('token');
          console.error('Token verification error:', error);
        }
      };

      verifyUserToken();
    } else {
      setError('No token provided');
    }
  }, [location.search, setUser]);

  console.log('App rendering with loading:', loading, 'error:', error, 'user:', user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && !user && !authenticated) {
    console.log('Redirecting to login due to error:', error);
    //return <Navigate replace to="/login" />;
  }

  return (
    <div key={location.key}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/leave-balance" />} />
        <Route path="/leave-balance" element={authenticated ? <LeaveBalance /> : <Navigate replace to="/login" />} />
        <Route path="/leave-request" element={authenticated ? <LeaveRequest /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} /> {/* Pass setAuthenticated */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
