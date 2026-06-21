// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/common/Layout';
import Landing from '../pages/Landing';
import About from '../pages/About';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import PatientProfile from '../pages/PatientProfile';
import Appointments from '../pages/Appointments';
import Medicine from '../pages/Medicine';
import Scanner from '../pages/Scanner';
import Profile from '../pages/Profile';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth" element={<Auth />} />

      {/* Protected Routes inside Global Layout */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient/:id" element={<PatientProfile />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;