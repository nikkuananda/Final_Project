import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export const fetchCategories = createAsyncThunk("category/fetch", async () => {
  const { data } = await api.get("/api/v1/categories");
  return data.data;
});
export const createCategory = createAsyncThunk(
  "category/create",
  async (payload) => {
    const { data } = await api.post("/api/v1/create-category", payload);
    return data.data;
  }
);
export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, ...rest }) => {
    const { data } = await api.post(`/api/v1/update-category/${id}`, rest);
    return data.data;
  }
);
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    await api.delete(`/api/v1/delete-category/${id}`);
    return id;
  }
);

const slice = createSlice({
  name: "category",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategories.fulfilled, (s, a) => {
      s.items = a.payload;
    })
      .addCase(createCategory.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })
      .addCase(updateCategory.fulfilled, (s, a) => {
        const i = s.items.findIndex((x) => x.id === a.payload.id);
        if (i >= 0) s.items[i] = a.payload;
      })
      .addCase(deleteCategory.fulfilled, (s, a) => {
        s.items = s.items.filter((x) => x.id !== a.payload);
      });
  },
});
export default slice.reducer;
