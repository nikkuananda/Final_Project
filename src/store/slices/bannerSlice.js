import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// GET banners
export const fetchBanners = createAsyncThunk("banners/fetch", async () => {
  const { data } = await api.get("/api/v1/banners");
  return data.data;
});

// POST banner
export const createBanner = createAsyncThunk(
  "banners/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/v1/banners", payload);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

// DELETE banner
export const deleteBanner = createAsyncThunk(
  "banners/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/banners/${id}`);
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
      // fetch
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // create
      .addCase(createBanner.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // delete
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload);
      });
  },
});

export default slice.reducer;
