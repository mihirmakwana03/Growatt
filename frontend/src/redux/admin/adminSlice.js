import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Optional: to manage a cookie

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const adminSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            // Set a session expiration timestamp (5 minutes from now)
            const sessionExpiry = Date.now() + 5 * 60 * 1000; // 300000 ms = 5 minutes
            
            // You can store it along with the user data:
            state.currentUser = { 
                ...action.payload, 
                expiry: sessionExpiry 
            };
            state.loading = false;
            state.error = null;
            
            // (Optional) Set a cookie that expires in 5 minutes.
            // js-cookie uses expiration in days: 5 minutes = 5/1440 day.
            Cookies.set('sessionExpiry', sessionExpiry, { expires: 5 / 1440 });
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.currentUser = null;
            // (Optional) Remove the session expiry cookie.
            Cookies.remove('sessionExpiry');
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, logout } = adminSlice.actions;
export default adminSlice.reducer;
