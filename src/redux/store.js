import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice.js';
import authReducer from './slices/authSlice.js';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
  preloadedState: {
    tasks: {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    },
    auth: {
      isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
      user: JSON.parse(localStorage.getItem('user')) || null,
    },
    
  },
});