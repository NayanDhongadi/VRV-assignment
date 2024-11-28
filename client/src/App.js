import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Authenticate/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AdminDashboard from './components/AdminDashboard';
import ModeratorDashboard from './components/ModeratorDashboard';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar  />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moderator-dashboard"
          element={
            <ProtectedRoute roleRequired="Moderator">
              <ModeratorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute roleRequired="User">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

