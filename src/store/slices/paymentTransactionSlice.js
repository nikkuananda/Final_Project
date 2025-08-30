// src/store/slices/paymentTransactionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// Buat pembayaran (checkout)
export const createPayment = createAsyncThunk(
  "paymentTransaction/create",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await api.post("/create-payment", paymentData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Cek status pembayaran
export const fetchPaymentStatus = createAsyncThunk(
  "paymentTransaction/status",
  async (paymentId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/payment-status/${paymentId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const paymentTransactionSlice = createSlice({
  name: "paymentTransaction",
  initialState: {
    payment: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetPayment: (state) => {
      state.payment = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payment = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch status
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payment = action.payload;
      })
      .addCase(fetchPaymentStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetPayment } = paymentTransactionSlice.actions;
export default paymentTransactionSlice.reducer;
