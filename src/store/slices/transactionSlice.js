import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// ============================
// USER SIDE
// ============================

// Ambil transaksi user
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

// Ambil transaksi by id
export const fetchTransactionById = createAsyncThunk(
  "transactions/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/transaction/${id}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch transaction by ID"
      );
    }
  }
);

// Bikin transaksi baru (checkout)
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

// Batalin transaksi
export const cancelTransaction = createAsyncThunk(
  "transactions/cancel",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/cancel-transaction/${id}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to cancel transaction"
      );
    }
  }
);

// Update bukti pembayaran
export const updateTransactionProof = createAsyncThunk(
  "transactions/updateProof",
  async ({ id, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await api.post("/upload-image", formData);
      const imageUrl =
        uploadRes.data?.url ||
        uploadRes.data?.data?.url ||
        uploadRes.data?.data?.imageUrl;

      if (!imageUrl) throw new Error("Upload image failed");

      const { data } = await api.post(
        `/update-transaction-proof-payment/${id}`,
        { proofPaymentUrl: imageUrl }
      );

      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to update transaction proof payment"
      );
    }
  }
);

// ============================
// PAYMENT METHODS
// ============================

export const fetchPaymentMethods = createAsyncThunk(
  "transactions/fetchPaymentMethods",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/payment-methods");
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch payment methods"
      );
    }
  }
);

// ============================
// ADMIN SIDE
// ============================

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

export const updateTransactionStatus = createAsyncThunk(
  "transactions/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const validStatuses = ["success", "cancel"];
      if (!validStatuses.includes(status)) {
        return rejectWithValue("Invalid status value");
      }

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
    items: [],
    all: [],
    detail: null,
    created: null,
    methods: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetTransaction: (state) => {
      state.created = null;
      state.detail = null;
      state.error = null;
      state.success = null;
      state.loading = false; // tambahan biar clean
    },
    resetCreated: (state) => {
      state.created = null;
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
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload || null;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.created = action.payload;
          if (!state.items.find((t) => t?.id === action.payload.id)) {
            state.items = [action.payload, ...state.items];
          }
          state.success = "Transaction created successfully ✅";
        }
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ============================
      // PAYMENT METHODS
      // ============================
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.methods = action.payload || [];
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      .addCase(updateTransactionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          const idx = state.all.findIndex((t) => t?.id === action.payload.id);
          if (idx !== -1) state.all[idx] = action.payload;
          state.success = "Transaction status updated ✅";
        }
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ============================
      // CANCEL + PROOF
      // ============================
      .addCase(cancelTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelTransaction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          const idx = state.items.findIndex((t) => t?.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
          const idxAll = state.all.findIndex(
            (t) => t?.id === action.payload.id
          );
          if (idxAll !== -1) state.all[idxAll] = action.payload;
          if (state.detail?.id === action.payload.id) {
            state.detail = action.payload;
          }
          state.success = "Transaction canceled ❌";
        }
      })
      .addCase(cancelTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTransactionProof.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransactionProof.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          if (state.detail?.id === action.payload.id) {
            state.detail = action.payload;
          }
          const idx = state.items.findIndex((t) => t?.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
          state.success = "Transaction proof updated 📷";
        }
      })
      .addCase(updateTransactionProof.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTransaction, resetCreated } = transactionSlice.actions;
export default transactionSlice.reducer;
