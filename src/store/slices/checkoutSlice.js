// src/store/slices/checkoutSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api"; // pastikan ada helper axios

// --- Async Thunk untuk fetch metode pembayaran dari API ---
export const fetchPaymentMethods = createAsyncThunk(
  "checkout/fetchPaymentMethods",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/v1/payment-methods"); // sesuaikan endpoint
      return res.data.data; // asumsi respons { data: [...] }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal fetch metode pembayaran"
      );
    }
  }
);

const initialState = {
  items: [], // data item yang mau dibayar (ambil dari cart)
  total: 0, // total harga
  methods: [], // daftar metode pembayaran (API / static)
  selectedMethod: "", // metode yang dipilih user
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutItems: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    setMethods: (state, action) => {
      state.methods = action.payload;
    },
    selectMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },
    resetCheckout: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setCheckoutItems, setMethods, selectMethod, resetCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
