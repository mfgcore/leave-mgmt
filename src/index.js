import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext';

const basename = process.env.REACT_APP_BASE_NAME || '/';

console.log('Index.js: basename: ', basename);

const startApp = () => {
  const container = document.getElementById('root');
  const root = createRoot(container); // Use createRoot from react-dom/client

  const tokenFromUrl = new URL(window.location.href).searchParams.get('token');
  console.log('Index.js: Token from URL:', tokenFromUrl);

  if (tokenFromUrl) {
    localStorage.setItem('token', tokenFromUrl);
    console.log('Index.js: Token set in localStorage from URL:', tokenFromUrl);
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
      console.log('Index.js: Mock API started successfully');
      startApp();
    }).catch((error) => {
      console.error('Index.js: Failed to start Mock API:', error);
      startApp();
    });
  });
} else {
  startApp();
}

reportWebVitals();
