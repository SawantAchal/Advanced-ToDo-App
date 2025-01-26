import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      {/* Protected Route for authenticated users */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
        }
      />

      {/* Login route */}
      <Route
        path="/login"
        element={
          !isAuthenticated ? <Login /> : <Navigate to="/" replace />
        }
      />

      {/* Register route */}
      <Route
        path="/register"
        element={
          !isAuthenticated ? <Register /> : <Navigate to="/" replace />
        }
      />

      {/* Redirect all other routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
