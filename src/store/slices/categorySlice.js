import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export const fetchCategories = createAsyncThunk("category/fetch", async () => {
  const { data } = await api.get("/categories");
  return data.data;
});

export const createCategory = createAsyncThunk(
  "category/create",
  async (payload) => {
    const { data } = await api.post("/create-category", payload);
    return data.data;
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, ...rest }) => {
    const { data } = await api.post(`/update-category/${id}`, rest);
    return data.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    await api.delete(`/delete-category/${id}`);
    return id;
  }
);

const slice = createSlice({
  name: "category",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const i = state.items.findIndex((x) => x.id === action.payload.id);
        if (i >= 0) state.items[i] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => x.id !== action.payload);
      });
  },
});

export default slice.reducer;
