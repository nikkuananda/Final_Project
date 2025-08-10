import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api"; // Axios instance that has the BASE_URL and API_KEY

// =========================
// GET ALL ACTIVITIES
// =========================
export const fetchActivities = createAsyncThunk(
  "activities/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/activities");
      return data.data;
    } catch (err) {
      console.error(
        "❌ fetchActivities error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =========================
// GET ACTIVITY BY ID
// =========================
export const fetchActivityById = createAsyncThunk(
  "activities/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/activity/${id}`);
      return data.data;
    } catch (err) {
      console.error(
        "❌ fetchActivityById error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =========================
// GET ACTIVITIES BY CATEGORY
// =========================
export const fetchActivitiesByCategory = createAsyncThunk(
  "activities/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/activities-by-category/${categoryId}`);
      return data.data;
    } catch (err) {
      console.error(
        "❌ fetchActivitiesByCategory error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =========================
// CREATE ACTIVITY
// =========================
export const createActivity = createAsyncThunk(
  "activities/create",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Sending create activity request with payload:", payload); // Debugging Payload
      const { data } = await api.post("/create-activity", payload);
      return data.data;
    } catch (err) {
      console.error(
        "❌ createActivity error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =========================
// UPDATE ACTIVITY
// =========================
export const updateActivity = createAsyncThunk(
  "activities/update",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      console.log("Sending update activity request with payload:", payload); // Debugging Payload
      const { data } = await api.post(`/update-activity/${id}`, payload);
      return data.data;
    } catch (err) {
      console.error(
        "❌ updateActivity error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =========================
// DELETE ACTIVITY
// =========================
export const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete-activity/${id}`);
      return id;
    } catch (err) {
      console.error(
        "❌ deleteActivity error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =========================
// SLICE
// =========================
const activitySlice = createSlice({
  name: "activities",
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
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

      // FETCH BY ID
      .addCase(fetchActivityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selected = null;
      })

      // FETCH BY CATEGORY
      .addCase(fetchActivitiesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivitiesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchActivitiesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createActivity.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // UPDATE
      .addCase(updateActivity.fulfilled, (state, action) => {
        const idx = state.items.findIndex((x) => x.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x.id !== action.payload);
      });
  },
});

export const { clearSelected } = activitySlice.actions;
export default activitySlice.reducer;
