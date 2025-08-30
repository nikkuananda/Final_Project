import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// =========================
// GET ALL (support filter / search)
// =========================
export const fetchActivities = createAsyncThunk(
  "activities/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { keyword, categoryId } = params;

      // build query string
      const query = [];
      if (keyword) query.push(`keyword=${keyword}`);
      if (categoryId) query.push(`categoryId=${categoryId}`);

      const qs = query.length ? `?${query.join("&")}` : "";

      const { data } = await api.get(`/activities${qs}`);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// GET BY ID (fix endpoint!)
// =========================
export const fetchActivity = createAsyncThunk(
  "activities/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/activity/${id}`); // ✅ singular
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// CREATE
// =========================
export const createActivity = createAsyncThunk(
  "activities/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/create-activity", payload);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// UPDATE
// =========================
export const updateActivity = createAsyncThunk(
  "activities/update",
  async ({ id, ...rest }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/update-activity/${id}`, rest);
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

// =========================
// DELETE
// =========================
export const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete-activity/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

const slice = createSlice({
  name: "activities",
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // =========================
      // GET ALL
      // =========================
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // GET BY ID
      // =========================
      .addCase(fetchActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selected = null;
      })

      // =========================
      // CREATE
      // =========================
      .addCase(createActivity.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // =========================
      // UPDATE
      // =========================
      .addCase(updateActivity.fulfilled, (state, action) => {
        const i = state.items.findIndex((x) => x.id === action.payload.id);
        if (i >= 0) state.items[i] = action.payload;
      })

      // =========================
      // DELETE
      // =========================
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x.id !== action.payload);
      });
  },
});

export default slice.reducer;
