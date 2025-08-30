import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// GET
export const fetchBanners = createAsyncThunk("banners/fetch", async () => {
  const { data } = await api.get("/banners");
  return data.data;
});

// POST
export const createBanner = createAsyncThunk(
  "banners/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/banners", payload);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

// DELETE
export const deleteBanner = createAsyncThunk(
  "banners/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/banners/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

const slice = createSlice({
  name: "banners",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload);
      });
  },
});

export default slice.reducer;
