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
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    console.log('App.js: useEffect in App.js triggered');
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    const tokenFromLocalStorage = localStorage.getItem('token');
    const token = tokenFromUrl || tokenFromLocalStorage;

    console.log('App.js: Token for verification:', token);

    if (token) {
      const verifyUserToken = async () => {
        console.log('App.js: Verifying token:', token);
        try {
          const response = await verifyToken(token);
          setUser({ token, ...response.data });
          if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            console.log('App.js: Token set in localStorage from URL:', tokenFromUrl);
          }
          console.log('App.js: User set in context:', response.data);
        } catch (error) {
          setError('App.js: Invalid or expired token');
          localStorage.removeItem('token');
          console.error('App.js: Token verification error:', error);
        } finally {
          setIsFirstLoad(false);
        }
      };

      verifyUserToken();
    } else {
      setError('App.js: No token provided');
      setIsFirstLoad(false);
    }
  }, [location.search, setUser]);

  console.log('App.js: App rendering with loading:', loading, 'error:', error, 'user:', user);

  if (loading || isFirstLoad) {
    return <div>Loading...</div>;
  }

  console.log('App.js: check error :', error);
/*
  if (error && !user) {
    console.log('App.js: Redirecting to login due to error:', error);
    return <Navigate to="/login" />;
  }
*/

  return (
    <div key={location.key}>
      <Routes>
        <Route path="/" element={<Navigate to="/leave-balance" />} />
        <Route path="/leave-balance" element={<LeaveBalance />} />
        <Route path="/leave-request" element={<LeaveRequest />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
