import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import {
  createLocation,
  deleteLocation,
  getLocations,
  updateLocation,
} from "../thunks";

const locationAdapter = createEntityAdapter();

const initialState = locationAdapter.getInitialState({
  status: "not_loaded",
  error: null,
});

export const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocations.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.status = "loaded";
      locationAdapter.setAll(state, action.payload);
    });

    builder.addCase(getLocations.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateLocation.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateLocation.fulfilled, (state, action) => {
      state.status = "saved";
      locationAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(updateLocation.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(createLocation.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(createLocation.fulfilled, (state, action) => {
      state.status = "saved";
      locationAdapter.addOne(state, action.payload);
    });

    builder.addCase(createLocation.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deleteLocation.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteLocation.fulfilled, (state, action) => {
      state.status = "deleted";
      locationAdapter.removeOne(state, action.payload);
    });

    builder.addCase(deleteLocation.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { selectAll: selectAllLocations, selectById: selectLocationById } =
  locationAdapter.getSelectors((state) => state?.location);

export const selectLocationsThunksStatus = (state) => state?.location.status;

export const selectLocationsThunksError = (state) => state?.location.error;

export const { setStatus } = locationSlice.actions;

export default locationSlice.reducer;
