import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// =========================
// GET ALL BANNERS
// =========================
export const fetchBanners = createAsyncThunk(
  "banners/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/banners"); // API endpoint to fetch all banners
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// GET BANNER BY ID
// =========================
export const fetchBannerById = createAsyncThunk(
  "banners/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/banner/${id}`); // API endpoint to fetch banner by ID
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// CREATE BANNER
// =========================
export const createBanner = createAsyncThunk(
  "banners/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/create-banner", payload); // API endpoint to create a new banner
      return data.data;
    } catch (e) {
      // Log the error to the console for more detailed debugging
      console.error(
        "Error while creating banner:",
        e.response?.data || e.message
      );

      // Provide a more detailed message for debugging
      return rejectWithValue(
        e.response?.data?.message ||
          "Something went wrong while creating the banner"
      );
    }
  }
);

// =========================
// UPDATE BANNER
// =========================
export const updateBanner = createAsyncThunk(
  "banners/update",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/update-banner/${id}`, payload); // API endpoint to update banner
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// DELETE BANNER
// =========================
export const deleteBanner = createAsyncThunk(
  "banners/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete-banner/${id}`); // API endpoint to delete banner by ID
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// SLICE
// =========================
const slice = createSlice({
  name: "banners",
  initialState: {
    items: [], // List of banners
    selectedBanner: null, // Selected banner details
    loading: false,
    error: null,
  },
  reducers: {
    // Action to clear selected banner data
    clearSelectedBanner: (state) => {
      state.selectedBanner = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(fetchBannerById.fulfilled, (state, action) => {
        state.selectedBanner = action.payload;
      })

      // CREATE
      .addCase(createBanner.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // UPDATE
      .addCase(updateBanner.fulfilled, (state, action) => {
        const i = state.items.findIndex((b) => b.id === action.payload.id);
        if (i >= 0) state.items[i] = action.payload;
      })

      // DELETE
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload);
      });
  },
});

// Action to clear selected banner data
export const { clearSelectedBanner } = slice.actions;
export default slice.reducer;
