import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from './redux/admin/adminSlice.js'; // adjust the path as needed

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser && Date.now() > currentUser.expiry) {
      // Session expired: Dispatch logout so Redux state is cleared.
      dispatch(logout());
    }
  }, [currentUser, dispatch]);

  // If no user or if session expired, redirect to login.
  if (!currentUser || (currentUser && Date.now() > currentUser.expiry)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default PrivateRoute;
