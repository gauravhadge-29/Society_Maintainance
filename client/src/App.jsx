import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Resident Pages
import ResidentDashboard from './pages/resident/ResidentDashboard';
import CreateComplaint from './pages/resident/CreateComplaint';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateNotice from './pages/admin/CreateNotice';

// Shared Pages
import NoticeBoard from './pages/shared/NoticeBoard';
import ComplaintDetail from './pages/shared/ComplaintDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Resident Routes */}
        <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        <Route path="/resident/complaints/new" element={<CreateComplaint />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/notices/new" element={<CreateNotice />} />

        {/* Shared Routes */}
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/complaints/:id" element={<ComplaintDetail />} />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
