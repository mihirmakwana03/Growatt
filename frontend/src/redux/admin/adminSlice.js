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
            // Set a session expiration timestamp (1 minute from now)
            const sessionExpiry = Date.now() + 60 * 1000; // 60000 ms = 1 minute
            
            // You can store it along with the user data:
            state.currentUser = { 
                ...action.payload, 
                expiry: sessionExpiry 
            };
            state.loading = false;
            state.error = null;
            
            // (Optional) Set a cookie that expires in 1 minute.
            // js-cookie uses expiration in days: 1 minute = 1/1440 day.
            Cookies.set('sessionExpiry', sessionExpiry, { expires: 1 / 1440 });
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
