import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import {
  createProfessional,
  deleteProfessional,
  getProfessionals,
  updateProfessional,
} from "../thunks";

const professionalAdapter = createEntityAdapter();

const initialState = professionalAdapter.getInitialState({
  status: "not_loaded",
  error: null,
});

export const professionalSlice = createSlice({
  name: "professional",
  initialState: initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfessionals.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getProfessionals.fulfilled, (state, action) => {
      state.status = "loaded";
      professionalAdapter.setAll(state, action.payload);
    });

    builder.addCase(getProfessionals.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateProfessional.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateProfessional.fulfilled, (state, action) => {
      state.status = "saved";
      professionalAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(updateProfessional.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(createProfessional.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(createProfessional.fulfilled, (state, action) => {
      state.status = "saved";
      professionalAdapter.addOne(state, action.payload);
    });

    builder.addCase(createProfessional.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deleteProfessional.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteProfessional.fulfilled, (state, action) => {
      state.status = "deleted";
      professionalAdapter.removeOne(state, action.payload);
    });

    builder.addCase(deleteProfessional.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const {
  selectAll: selectAllProfessionals,
  selectById: selectProfessionalById,
} = professionalAdapter.getSelectors((state) => state?.professional);

export const selectProfessionalsThunksStatus = (state) =>
  state?.professional.status;

export const selectProfessionalsThunksError = (state) =>
  state?.professional.error;

export const { setStatus } = professionalSlice.actions;

export default professionalSlice.reducer;
