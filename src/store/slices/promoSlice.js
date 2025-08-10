// src/store/slices/promoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// GET all promos
export const fetchPromos = createAsyncThunk("promo/fetch", async () => {
  const { data } = await api.get("/api/v1/promos");
  return data.data;
});

// POST create promo
export const createPromo = createAsyncThunk(
  "promo/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/v1/promos", payload);
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
      await api.delete(`/api/v1/promos/${id}`);
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
  extraReducers: (b) => {
    b.addCase(fetchPromos.fulfilled, (s, a) => {
      s.items = a.payload;
    })
      .addCase(createPromo.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })
      .addCase(deletePromo.fulfilled, (s, a) => {
        s.items = s.items.filter((x) => x.id !== a.payload);
      });
  },
});

export default slice.reducer;
