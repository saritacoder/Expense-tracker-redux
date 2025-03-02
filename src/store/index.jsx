import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import expenseReducer from './expenseSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    expenseState: expenseReducer,
    userState: userReducer,
  },
});
