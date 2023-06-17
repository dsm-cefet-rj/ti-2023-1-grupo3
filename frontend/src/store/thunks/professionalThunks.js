import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProfessionals as getProfessionalsService,
  updateProfessional as updateProfessionalService,
  createProfessional as createProfessionalService,
  deleteProfessional as deleteProfessionalService,
  createFullProfessional as createFullProfessionalService,
} from "../../services";

export const getProfessionals = createAsyncThunk(
  "professional/getProfessionals",
  async () => {
    const response = await getProfessionalsService();

    return response.data;
  }
);

export const updateProfessional = createAsyncThunk(
  "professional/updateProfessional",
  async (professional) => {
    const response = await updateProfessionalService(professional);

    return response.data;
  }
);

export const createProfessional = createAsyncThunk(
  "professional/createProfessional",
  async (professional) => {
    const response = await createProfessionalService(professional);

    return response.data;
  }
);

export const createFullProfessional = createAsyncThunk(
  "professional/createFullProfessional",
  async (professional) => {
    const response = await createFullProfessionalService(professional);

    return response.data;
  }
);

export const deleteProfessional = createAsyncThunk(
  "professional/deleteProfessional",
  async (id) => {
    const response = await deleteProfessionalService(id);

    return response.data;
  }
);
