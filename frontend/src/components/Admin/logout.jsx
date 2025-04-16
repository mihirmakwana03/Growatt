import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/admin/adminSlice.js';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

// Logout.js

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Dispatch the logout action to clear the user and remove the cookie.
        dispatch(logout());
        // Navigate to the login route.
        navigate('/login');
    }, [dispatch, navigate]);

    return null; // No UI is necessary.
};

export default Logout;
