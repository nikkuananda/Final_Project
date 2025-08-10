// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// =====================
// GET LOGGED USER PROFILE
// =====================
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user"); // ✅ hilangkan /api/v1
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =====================
// GET ALL USERS
// =====================
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/all-user"); // ✅
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =====================
// CREATE USER
// =====================
export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/register", payload); // ✅
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =====================
// UPDATE PROFILE
// =====================
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/update-profile", payload); // ✅
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =====================
// UPDATE USER ROLE
// =====================
export const updateUserRole = createAsyncThunk(
  "user/updateRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/update-user-role/${userId}`, { role }); // ✅
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  profile: null,
  allUsers: [],
  profileLoading: false,
  allUsersLoading: false,
  mutationLoading: false, // create/update
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
      })

      // fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.allUsersLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsersLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.allUsersLoading = false;
        state.error = action.payload;
      })

      // create user
      .addCase(createUser.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.allUsers.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload;
      })

      // update user role
      .addCase(updateUserRole.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.mutationLoading = false;
        const updated = action.payload;
        state.allUsers = state.allUsers.map((u) =>
          u.id === updated.id ? updated : u
        );
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
