import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// ambil cart dari API
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const { data } = await api.get("/api/v1/carts");
  return data.data;
});

// tambah ke cart
export const addToCart = createAsyncThunk("cart/add", async (payload) => {
  const { data } = await api.post("/api/v1/add-cart", payload);
  return data.data;
});

// update cart
export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ id, ...rest }) => {
    const { data } = await api.post(`/api/v1/update-cart/${id}`, rest);
    return data.data;
  }
);

// hapus cart
export const deleteCart = createAsyncThunk("cart/delete", async (id) => {
  await api.delete(`/api/v1/delete-cart/${id}`);
  return id;
});

const slice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCart.fulfilled, (s, a) => {
      s.items = a.payload;
    })
      .addCase(addToCart.fulfilled, (s, a) => {
        s.items.push(a.payload);
      })
      .addCase(updateCart.fulfilled, (s, a) => {
        const i = s.items.findIndex((x) => x.id === a.payload.id);
        if (i >= 0) s.items[i] = a.payload;
      })
      .addCase(deleteCart.fulfilled, (s, a) => {
        s.items = s.items.filter((x) => x.id !== a.payload);
      });
  },
});

export default slice.reducer;
