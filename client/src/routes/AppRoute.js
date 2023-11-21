import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminPage from './AdminPage';
import { useUserAuth } from '../context/UserAuthContext';

const AppRoutes = () => {
  const { user } = useUserAuth();

  const isAdmin = user && user.email === 'admin@gmail.com';

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
