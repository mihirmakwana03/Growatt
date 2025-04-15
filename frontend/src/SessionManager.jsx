import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/adminSlice';

const SessionManager = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    let timer;
    if (currentUser) {
      const remainingTime = currentUser.expiry - Date.now();
      // Set a timeout to logout when the session expires
      timer = setTimeout(() => {
        dispatch(logout());
      }, remainingTime);
    }
    return () => clearTimeout(timer);
  }, [currentUser, dispatch]);

  return null;
};

export default SessionManager;
