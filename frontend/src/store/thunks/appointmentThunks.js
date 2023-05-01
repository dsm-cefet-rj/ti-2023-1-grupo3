import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getClientAppointments as getClientAppointmentsService,
  getProfessionalAppointments as getProfessionalAppointmentsService,
  updateAppointment as updateAppointmentService,
  createAppointment as createAppointmentService,
  deleteAppointment as deleteAppointmentService,
} from "../../services";

export const getClientAppointments = createAsyncThunk(
  "appointment/getClientAppointments",
  async (id) => {
    const response = await getClientAppointmentsService(id);

    return response.data;
  }
);

export const getProfessionalAppointments = createAsyncThunk(
  "appointment/getProfessionalAppointments",
  async (id) => {
    const response = await getProfessionalAppointmentsService(id);

    return response.data;
  }
);

export const updateAppointment = createAsyncThunk(
  "appointment/updateAppointment",
  async (appointment) => {
    const response = await updateAppointmentService(appointment);

    return response.data;
  }
);

export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (appointment) => {
    const response = await createAppointmentService(appointment);

    return response.data;
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointment/deleteAppointment",
  async (id) => {
    const response = await deleteAppointmentService(id);

    return response.data;
  }
);
