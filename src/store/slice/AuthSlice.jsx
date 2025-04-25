import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  token: localStorage.getItem('idToken') || null,
  isLoggedIn: !!localStorage.getItem('idToken'),
};

// Create a slice of the state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem('idToken', token);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('idToken');
    },
  },
});

// Export actions to dispatch from components
export const { login, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
