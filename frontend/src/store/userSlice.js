import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../services";

export const initializeUser = createAsyncThunk(
  "user/initializeUser",
  async (userId) => {
    console.log(userId);
    const response = await getUserById(userId);

    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    initialized: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.initialized = true;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsUserInitialized = (state) => state.user.initialized;

export default userSlice.reducer;
