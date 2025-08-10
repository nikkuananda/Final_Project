import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// =========================
// GET ALL PROMOS (User & Admin)
// =========================
export const fetchPromos = createAsyncThunk(
  "promos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/promos");
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// GET PROMO BY ID
// =========================
export const fetchPromoById = createAsyncThunk(
  "promos/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/promo/${id}`);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// CREATE PROMO (Admin only)
// =========================
export const createPromo = createAsyncThunk(
  "promos/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/create-promo", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// UPDATE PROMO (Admin only)
// =========================
export const updatePromo = createAsyncThunk(
  "promos/update",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/update-promo/${id}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// DELETE PROMO (Admin only)
// =========================
export const deletePromo = createAsyncThunk(
  "promos/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete-promo/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// SLICE
// =========================
const promoSlice = createSlice({
  name: "promos",
  initialState: {
    items: [], // List of promos
    current: null, // Detail promo by id
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPromo: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all promos
      .addCase(fetchPromos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPromos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch promo by id
      .addCase(fetchPromoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromoById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchPromoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create promo
      .addCase(createPromo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update promo
      .addCase(updatePromo.fulfilled, (state, action) => {
        const i = state.items.findIndex((p) => p.id === action.payload.id);
        if (i >= 0) state.items[i] = action.payload;
        if (state.current?.id === action.payload.id) {
          state.current = action.payload;
        }
      })

      // Delete promo
      .addCase(deletePromo.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x.id !== action.payload);
        if (state.current?.id === action.payload) {
          state.current = null;
        }
      });
  },
});

export const { clearCurrentPromo } = promoSlice.actions;
export default promoSlice.reducer;
