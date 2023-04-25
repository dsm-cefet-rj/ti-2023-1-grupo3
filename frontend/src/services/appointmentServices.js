import { axiosInstance } from "./axiosInstance";

export const getPaginatedClientAppointments = async (id, page, limit) => {
  console.log(page, limit);
  return await axiosInstance.get(
    `/appointments?userId=${id}&_page=${page}&_limit=${limit}&_expand=professional&_embed=user&_expand=location`
  );
};

export const getPaginatedProfessionalAppointments = async (id, page, limit) => {
  return await axiosInstance.get(
    `/appointments?professionalId=${id}&_page=${page}&_limit=${limit}&_expand=professional&_expand=location`
  );
};

export const createAppointment = async (appointment) => {
  return await axiosInstance.post("/appointments", appointment);
};

export const deleteAppointment = async (id) => {
  return await axiosInstance.delete(`/appointments/${id}`);
};

export const getAppointmentById = async (id) => {
  return await axiosInstance.get(`/appointments/${id}`);
};

export const updateAppointment = async (id, appointment) => {
  return await axiosInstance.get(`/appointments/${id}`, appointment);
};
