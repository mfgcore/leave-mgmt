import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext';

const basename = process.env.NODE_ENV === 'development' ? '/' : '/leave-mgmt';

const startApp = () => {
  const container = document.getElementById('root');
  const root = createRoot(container); // Use createRoot from react-dom/client

  const appendToken = (url, token) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set('token', token);
    return urlObj.toString();
  };

  const tokenFromUrl = new URL(window.location.href).searchParams.get('token');

  if (tokenFromUrl) {
    localStorage.setItem('token', tokenFromUrl);
  } else {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (!tokenFromLocalStorage && process.env.NODE_ENV === 'development') {
      console.log('adding fake token ...');
      const currentUrl = window.location.href;
      const newUrl = appendToken(currentUrl, 'YOUR_FAKE_TOKEN');
      if (currentUrl !== newUrl) {
        window.location.href = newUrl;
        return; // Prevent further execution until the page reloads
      }
      localStorage.setItem('token', 'YOUR_FAKE_TOKEN'); // Ensure token is stored in localStorage
    } else if (!tokenFromLocalStorage) {
      window.location.href = `${window.location.origin}${basename}/login`;
      return; // Redirect to login page if no token is found
    }
  }

  root.render(
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

if (process.env.REACT_APP_USE_MOCK_API === 'true') {
  import('./mockApi').then(({ default: initializeMockApi }) => {
    initializeMockApi().then(() => {
      console.log('Mock API started successfully');
      startApp();
    }).catch((error) => {
      console.error('Failed to start Mock API:', error);
      startApp();
    });
  });
} else {
  startApp();
}

reportWebVitals();
