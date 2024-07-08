const API_BASE_URL = process.env.REACT_APP_USE_MOCK_API === 'true'
  ? ''
  : 'https://your-real-api.com';

export default API_BASE_URL;

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Invalid token');
      }
      throw new Error('Token verification failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    throw error;
  }
};

export const get = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error(`GET request to ${url} failed`);
    }

    return response.json();
  } catch (error) {
    console.error('Error with GET request:', error.message);
    throw error;
  }
};

export const post = async (url, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`POST request to ${url} failed`);
    }

    return response.json();
  } catch (error) {
    console.error('Error with POST request:', error.message);
    throw error;
  }
};
