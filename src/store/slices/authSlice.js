// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// ==============================
// REGISTER
// ==============================
export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/register", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        passwordRepeat: payload.passwordRepeat || payload.password,
        phoneNumber: payload.phoneNumber,
        role: payload.role || "user",
        profilePictureUrl:
          payload.profilePictureUrl || "https://i.pravatar.cc/150?img=3",
      });

      const token = res.data?.token || null;
      const user = res.data?.data || null;

      if (token) localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ==============================
// LOGIN
// ==============================
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", {
        email: payload.email,
        password: payload.password,
      });

      const token = res.data?.token || null;
      const user = res.data?.data || null;

      if (!token) throw new Error("Token tidak ditemukan di response");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ==============================
// GET ME (PROFILE)
// ==============================
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user");
      const user = res.data?.data || null;

      if (user) localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ==============================
// LOGOUT
// ==============================
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/logout"); // hit API logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return true;
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ==============================
// HELPERS
// ==============================
const clearAuthState = (state) => {
  state.user = null;
  state.token = null;
};

// ==============================
// SLICE
// ==============================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem("user")) || null;
      } catch {
        return null;
      }
    })(),
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // GET ME
      .addCase(getMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        if (
          action.payload?.toString().toLowerCase().includes("unauthorized") ||
          action.payload?.toString().includes("token")
        ) {
          clearAuthState(state);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        clearAuthState(state);
      })
      .addCase(logout.rejected, (state) => {
        clearAuthState(state);
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
