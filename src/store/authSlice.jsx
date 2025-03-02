import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwtToken: localStorage.getItem('jwtToken'),
  loggedIn: !!localStorage.getItem('jwtToken'),
  userName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem('jwtToken', action.payload.jwtToken);
      state.loggedIn = true;
      state.jwtToken = action.payload.jwtToken;
      state.userName = action.payload.userName;
    },
    logout(state) {
      localStorage.removeItem('jwtToken');
      state.jwtToken = null;
      state.loggedIn = false;
      state.userName = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
