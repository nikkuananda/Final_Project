// src/store/slices/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// =========================
// Helper: Ambil data dari response
// =========================
const unwrapResponse = (res) => res.data?.data || res.data;

// =========================
// GET CART
// =========================
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/carts"); // cukup /carts
      return unwrapResponse(res);
    } catch (err) {
      console.error("❌ fetchCart error:", err.response?.data || err.message);
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status || 0,
      });
    }
  },
  {
    condition: () => {
      const token = localStorage.getItem("token");
      return !!token; // jangan call API kalau belum login
    },
  }
);

// =========================
// ADD TO CART
// =========================
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ activityId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const res = await api.post("/add-cart", { activityId, quantity }); // cukup /add-cart
      return unwrapResponse(res);
    } catch (err) {
      console.error("❌ addToCart error:", err.response?.data || err.message);
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status || 0,
      });
    }
  }
);

// =========================
// UPDATE CART
// =========================
export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/update-cart/${id}`, { quantity }); // cukup /update-cart/:id
      return unwrapResponse(res);
    } catch (err) {
      console.error("❌ updateCart error:", err.response?.data || err.message);
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status || 0,
      });
    }
  }
);

// =========================
// DELETE CART
// =========================
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete-cart/${id}`); // cukup /delete-cart/:id
      return id;
    } catch (err) {
      console.error("❌ deleteCart error:", err.response?.data || err.message);
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status || 0,
      });
    }
  }
);

// =========================
// SLICE
// =========================
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    errorCode: null,
    deleting: null, // ID item yang sedang dihapus
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.error = null;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Gagal memuat cart";
        state.errorCode = action.payload?.status || null;
      })

      // ADD
      .addCase(addToCart.pending, (state) => {
        state.error = null;
        state.errorCode = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload?.message || "Gagal menambah cart";
        state.errorCode = action.payload?.status || null;
      })

      // UPDATE
      .addCase(updateCart.pending, (state) => {
        state.error = null;
        state.errorCode = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        if (action.payload) {
          const i = state.items.findIndex((x) => x.id === action.payload.id);
          if (i >= 0) state.items[i] = action.payload;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.payload?.message || "Gagal update cart";
        state.errorCode = action.payload?.status || null;
      })

      // DELETE
      .addCase(deleteCart.pending, (state, action) => {
        state.deleting = action.meta.arg;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x.id !== action.payload);
        state.deleting = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.deleting = null;
        state.error = action.payload?.message || "Gagal hapus item";
        state.errorCode = action.payload?.status || null;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
