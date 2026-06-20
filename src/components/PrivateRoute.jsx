import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  
  // If there's no token, redirect to a hypothetical /login page
  // We'll create a basic Login placeholder later if needed, but for now we redirect.
  // Actually, wait, let's just use Navigate to /login.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
