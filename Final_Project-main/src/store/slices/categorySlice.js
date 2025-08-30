import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api"; // axios instance sudah pakai BASE_URL & API_KEY dari .env

// ==============================
// Helper: ambil token dari localStorage
// ==============================
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

// ==============================
// GET ALL CATEGORIES
// ==============================
export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/categories");
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ==============================
// GET CATEGORY BY ID
// ==============================
export const fetchCategoryById = createAsyncThunk(
  "category/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/category/${id}`);
      return res.data?.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ==============================
// CREATE CATEGORY (Admin Only)
// ==============================
export const createCategory = createAsyncThunk(
  "category/create",
  async ({ name, imageUrl }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post(
        "/create-category",
        { name, imageUrl },
        { headers: getAuthHeaders() }
      );
      // refresh list setelah berhasil
      dispatch(fetchCategories());
      return res.data || { message: "Category created" };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ==============================
// UPDATE CATEGORY (Admin Only)
// ==============================
export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, name, imageUrl }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post(
        `/update-category/${id}`,
        { name, imageUrl },
        { headers: getAuthHeaders() }
      );
      // refresh list setelah berhasil
      dispatch(fetchCategories());
      return res.data || { message: "Category updated" };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ==============================
// DELETE CATEGORY (Admin Only)
// ==============================
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.delete(`/delete-category/${id}`, {
        headers: getAuthHeaders(),
      });
      // refresh list setelah berhasil
      dispatch(fetchCategories());
      return res.data || { message: "Category deleted" };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ==============================
// SLICE
// ==============================
const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    selected: null,
    status: "idle", // idle | loading | succeeded | failed
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
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      // FETCH BY ID
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      // CREATE / UPDATE / DELETE success
      .addCase(createCategory.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      // ERROR HANDLER
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error =
            action.payload?.message ||
            action.payload?.errors ||
            action.error.message;
          state.status = "failed";
        }
      )
      // LOADING HANDLER
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      );
  },
});

export const { clearSelected } = categorySlice.actions;
export default categorySlice.reducer;
