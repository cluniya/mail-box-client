import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: localStorage.getItem('email') || '',
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      localStorage.setItem('email', state.email);
      localStorage.setItem('token', state.token);
    },
    logout: (state) => {
      state.email = '';
      state.token = '';
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
