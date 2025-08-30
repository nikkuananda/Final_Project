import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// GET all promos
export const fetchPromos = createAsyncThunk("promo/fetch", async () => {
  const { data } = await api.get("/promos"); // ❌ hapus /api/v1
  return data.data;
});

// POST create promo
export const createPromo = createAsyncThunk(
  "promo/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/promos", payload); // ❌ hapus /api/v1
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

// DELETE promo
export const deletePromo = createAsyncThunk(
  "promo/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/promos/${id}`); // ❌ hapus /api/v1
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

const slice = createSlice({
  name: "promo",
  initialState: { items: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createPromo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePromo.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x.id !== action.payload);
      });
  },
});

export default slice.reducer;
