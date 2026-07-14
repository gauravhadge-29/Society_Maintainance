import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Resident Pages
import ResidentDashboard from './pages/resident/ResidentDashboard';
import CreateComplaint from './pages/resident/CreateComplaint';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateNotice from './pages/admin/CreateNotice';
import AdminComplaints from './pages/admin/AdminComplaints';

// Shared Pages
import NoticeBoard from './pages/shared/NoticeBoard';
import ComplaintDetail from './pages/shared/ComplaintDetail';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Residents Only */}
          <Route element={<ProtectedRoute allowedRoles={['resident', 'admin']} />}>
            <Route path="/resident/dashboard" element={<ResidentDashboard />} />
            <Route path="/resident/complaints/new" element={<CreateComplaint />} />
            <Route path="/complaints/:id" element={<ComplaintDetail />} />
            <Route path="/notices" element={<NoticeBoard />} />
          </Route>

          {/* Protected Routes - Admins Only */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
            <Route path="/admin/notices/new" element={<CreateNotice />} />
          </Route>

          {/* Default Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
