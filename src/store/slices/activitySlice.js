// src/store/slices/activitySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// GET all
export const fetchActivities = createAsyncThunk("activity/fetch", async () => {
  const { data } = await api.get("/api/v1/activities");
  return data.data;
});

// GET by category
export const fetchByCategory = createAsyncThunk(
  "activity/byCategory",
  async (id) => {
    const { data } = await api.get(`/api/v1/activities-by-category/${id}`);
    return data.data;
  }
);

// GET by id
export const fetchActivity = createAsyncThunk("activity/byId", async (id) => {
  const { data } = await api.get(`/api/v1/activity/${id}`);
  return data.data;
});

// POST create
export const createActivity = createAsyncThunk(
  "activity/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/v1/activities", payload);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

// DELETE
export const deleteActivity = createAsyncThunk(
  "activity/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/activities/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

const slice = createSlice({
  name: "activity",
  initialState: { items: [], selected: null, error: null },
  reducers: {},
  extraReducers: (b) => {
    // fetch
    b.addCase(fetchActivities.fulfilled, (s, a) => {
      s.items = a.payload;
    })
      .addCase(fetchByCategory.fulfilled, (s, a) => {
        s.items = a.payload;
      })
      .addCase(fetchActivity.fulfilled, (s, a) => {
        s.selected = a.payload;
      })

      // create
      .addCase(createActivity.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })

      // delete
      .addCase(deleteActivity.fulfilled, (s, a) => {
        s.items = s.items.filter((x) => x.id !== a.payload);
      });
  },
});

export default slice.reducer;
