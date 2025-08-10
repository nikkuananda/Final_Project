// src/store/slices/transactionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// ambil transaksi user
export const fetchMyTransactions = createAsyncThunk(
  "transactions/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/v1/my-transactions");
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch transactions"
      );
    }
  }
);

// ambil daftar metode pembayaran
export const fetchPaymentMethods = createAsyncThunk(
  "transactions/fetchMethods",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/v1/payment-methods");
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch payment methods"
      );
    }
  }
);

// bikin transaksi baru (checkout)
export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/v1/checkout", payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to create transaction"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    items: [],
    methods: [], // <-- simpan metode pembayaran
    loading: false,
    error: null,
    created: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // myTransactions
      .addCase(fetchMyTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMyTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchPaymentMethods
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

      // createTransaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.created = action.payload;
        state.items.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
