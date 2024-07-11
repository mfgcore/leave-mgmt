import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken, refreshToken } from './services/leaveService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleTokenVerification = async (token) => {
    try {
      const userData = await verifyToken(token);
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      console.error('UserContext.js: Token verification error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
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
        console.error('UserContext.js: Token refresh error:', error.message);
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
