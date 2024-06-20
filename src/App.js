// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LeaveBalance from './components/LeaveBalance';
import LeaveRequest from './components/LeaveRequest';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/leave-balance" />} />
        <Route path="/leave-balance" element={<LeaveBalance />} />
        <Route path="/leave-request" element={<LeaveRequest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
