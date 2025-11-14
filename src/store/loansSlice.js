import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loansApi } from "../services/api";

export const fetchMyLoans = createAsyncThunk(
  "loans/fetchMyLoans",
  async (_, thunkAPI) => {
    try {
      const res = await loansApi.get("/my-loans");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const requestLoan = createAsyncThunk(
  "loans/requestLoan",
  async ({ libroId }, thunkAPI) => {
    try {
      const res = await loansApi.post("", { libro_id: libroId });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const loansSlice = createSlice({
  name: "loans",
  initialState: {
    items: [],
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLoans(state) {
      state.items = [];
      state.history = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.prestamos_activos || [];
        state.history = action.payload?.historial || [];
      })
      .addCase(fetchMyLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(requestLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload, ...(state.items || [])];
      })
      .addCase(requestLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLoans } = loansSlice.actions;
export default loansSlice.reducer;
