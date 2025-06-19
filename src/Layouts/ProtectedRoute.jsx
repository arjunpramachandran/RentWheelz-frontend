import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({allowedRole,children}) => {
  const {userData,isLoggedIn} = useSelector((state) => state.user);
 
console.log('is loged in',isLoggedIn);

 if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && userData.role !== allowedRole) {
    return <Navigate to="/home" />;
  }

  
  if (children) {
    return children;
  }

  return <Outlet />;
};

export default ProtectedRoute;