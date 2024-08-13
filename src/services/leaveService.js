import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const getLeaveBalance = (token) => {
  return axios.get(`${API_BASE_URL}/api/leave-balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getRequestOverview = (token) => {
  return axios.get(`${API_BASE_URL}/api/request-overview`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getLeaveTypes = () => {
  return axios.get(`${API_BASE_URL}/api/leave-types`);
};

export const postLeaveRequest = (data, token) => {
  return axios.post(`${API_BASE_URL}/api/leave-request`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const verifyToken = (token) => {
  console.log('Verifying token:', token);
  console.log('Verifying token url:', `${API_BASE_URL}/api/verify-token`);
  return axios.get(`${API_BASE_URL}/api/verify-token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Mock implementation for refreshToken
export const refreshToken = async () => {
  // Simulate a token refresh operation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'new_fake_token' });
    }, 1000);
  });
};
