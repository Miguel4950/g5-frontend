import { createSlice } from "@reduxjs/toolkit";

const storedUser = sessionStorage.getItem("user");
const storedToken = sessionStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.clear();
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
