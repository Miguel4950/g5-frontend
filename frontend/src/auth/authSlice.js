import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true, // MOCK para demo. Reemplazar al integrar login real
  user: { id: 1, nombre: "Bibliotecario Demo", rol: "bibliotecario" },
  token: "demo-token"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) { Object.assign(state, action.payload); },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("token");
    }
  }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
