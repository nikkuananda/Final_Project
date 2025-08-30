// src/store/slices/transactionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// ============================
// USER SIDE
// ============================

// ambil transaksi user
export const fetchMyTransactions = createAsyncThunk(
  "transactions/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/my-transactions");
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch transactions"
      );
    }
  }
);

// ambil daftar metode pembayaran
export const fetchPaymentMethods = createAsyncThunk(
  "transactions/fetchMethods",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/payment-methods"); // ✅ endpoint fix
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch payment methods"
      );
    }
  }
);

// bikin transaksi baru (checkout)
export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/create-transaction", payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create transaction"
      );
    }
  }
);

// batalin transaksi (user/admin)
export const cancelTransaction = createAsyncThunk(
  "transactions/cancel",
  async (transactionId, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/cancel-transaction", { transactionId });
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to cancel transaction"
      );
    }
  }
);

// ============================
// ADMIN SIDE
// ============================

// ambil semua transaksi (khusus admin)
export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/all-transactions");
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch all transactions"
      );
    }
  }
);

// update status transaksi (admin)
export const updateTransactionStatus = createAsyncThunk(
  "transactions/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/update-transaction-status/${id}`, {
        status,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update transaction status"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [], // transaksi user
    all: [], // transaksi untuk admin
    methods: [], // daftar metode pembayaran
    created: null, // hasil transaksi baru
    loading: false, // untuk transaksi
    loadingMethods: false, // untuk payment methods
    error: null,
    success: null,
  },
  reducers: {
    resetTransaction: (state) => {
      state.created = null;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ============================
      // USER SIDE
      // ============================
      .addCase(fetchMyTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchMyTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loadingMethods = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loadingMethods = false;
        state.methods = action.payload || [];
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loadingMethods = false;
        state.error = action.payload;
      })

      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.created = action.payload;

        // ✅ Cegah duplikat transaksi di state.items
        if (!state.items.find((t) => t.id === action.payload.id)) {
          state.items.push(action.payload);
        }

        state.success = "Transaction created successfully ✅";
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload.id);
        state.all = state.all.filter((t) => t.id !== action.payload.id);
        state.success = "Transaction canceled ❌";
      })

      // ============================
      // ADMIN SIDE
      // ============================
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload || [];
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        const idx = state.all.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.all[idx] = action.payload;
        state.success = "Transaction status updated ✅";
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
