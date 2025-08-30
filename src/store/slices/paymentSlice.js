// src/store/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// Ambil daftar metode pembayaran
export const fetchPaymentMethods = createAsyncThunk(
  "payment/fetchMethods",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/payment-methods");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    methods: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.methods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
