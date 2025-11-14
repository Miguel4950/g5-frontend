// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import uiReducer from "./uiSlice.js";
import loansReducer from "./loansSlice.js"; // <- nuevo

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    loans: loansReducer, // <- registrar
  },
});
