import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken, refreshToken } from './services/leaveService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleTokenVerification = async (token) => {
    try {
      console.log('Verifying token:', token);
      const response = await verifyToken(token);
      setUser({ token, ...response.data });
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      console.error('Token verification error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token from localStorage:', token);
    if (token) {
      handleTokenVerification(token);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newToken = await refreshToken();
        localStorage.setItem('token', newToken.token);
        handleTokenVerification(newToken.token);
      } catch (error) {
        console.error('Token refresh error:', error.message);
      }
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
