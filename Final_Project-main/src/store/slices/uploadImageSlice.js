// src/store/slices/uploadImageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api"; // pastikan api.js sudah berisi axios instance dengan baseURL

// Async thunk untuk upload image
export const uploadImage = createAsyncThunk(
  "uploadImage/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // return URL gambar dari API
      return response.data.url;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Upload gagal");
    }
  }
);

const uploadImageSlice = createSlice({
  name: "uploadImage",
  initialState: {
    loading: false,
    success: null,
    error: null,
    imageUrl: null,
  },
  reducers: {
    resetUpload: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
      state.imageUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Upload berhasil!";
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpload } = uploadImageSlice.actions;
export default uploadImageSlice.reducer;
