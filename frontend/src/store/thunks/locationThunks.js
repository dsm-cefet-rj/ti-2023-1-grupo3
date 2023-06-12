import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getLocations as getLocationsService,
  updateLocation as updateLocationService,
  createLocation as createLocationService,
  deleteLocation as deleteLocationService,
} from "../../services";

export const getLocations = createAsyncThunk(
  "location/getLocations",
  async () => {
    const response = await getLocationsService();

    return response.data;
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (location) => {
    const response = await updateLocationService(location);

    return response.data;
  }
);

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (location) => {
    const response = await createLocationService(location);

    return response.data;
  }
);

export const deleteLocation = createAsyncThunk(
  "location/deleteLocation",
  async (id) => {
    const response = await deleteLocationService(id);

    return response.data;
  }
);
