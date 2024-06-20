const API_BASE_URL = process.env.REACT_APP_USE_MOCK_API === 'true'
  ? ''
  : 'https://your-real-api.com';

export default API_BASE_URL;
