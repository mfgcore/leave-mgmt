// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Log the environment variable to ensure it's being read correctly
console.log('REACT_APP_USE_MOCK_API:', process.env.REACT_APP_USE_MOCK_API);

const startApp = () => {
  const container = document.getElementById('root');
  const root = createRoot(container); // Use createRoot from react-dom/client
  root.render(
    <React.StrictMode>
      <BrowserRouter basename='/leave-mgmt'>
        <App />
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
