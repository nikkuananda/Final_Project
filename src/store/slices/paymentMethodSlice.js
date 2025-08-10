// src/store/slices/paymentMethodSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// =========================
// GET ALL PAYMENT METHODS
// =========================
export const fetchPaymentMethods = createAsyncThunk(
  "paymentMethod/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/payment-methods");
      return data.data;
    } catch (err) {
      console.error(
        "❌ fetchPaymentMethods error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =========================
// GENERATE PAYMENT METHOD
// =========================
export const generatePaymentMethod = createAsyncThunk(
  "paymentMethod/generate",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/generate-payment-methods", payload);
      return data.data;
    } catch (err) {
      console.error(
        "❌ generatePaymentMethod error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState: {
    methods: [], // daftar payment methods
    generated: null, // hasil generate payment (checkout)
    loading: false,
    error: null,
  },
  reducers: {
    resetGenerated: (state) => {
      state.generated = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET METHODS
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.methods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GENERATE PAYMENT
      .addCase(generatePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.generated = action.payload;
      })
      .addCase(generatePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGenerated } = paymentMethodSlice.actions;
export default paymentMethodSlice.reducer;
