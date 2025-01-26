import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
      user: JSON.parse(localStorage.getItem('user')) || null,
    },
  },
});