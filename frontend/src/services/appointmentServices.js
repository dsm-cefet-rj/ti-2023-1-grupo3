import { axiosInstance } from "./axiosInstance";

export const getClientAppointments = async (id) => {
  return await axiosInstance.get(
    `/appointments?userId=${id}&_expand=professional&_expand=user&_expand=location`
  );
};

export const getProfessionalAppointments = async (id) => {
  return await axiosInstance.get(
    `/appointments?professionalId=${id}&_expand=professional&_expand=location`
  );
};

export const createAppointment = async (appointment) => {
  return await axiosInstance.post("/appointments", appointment);
};

export const deleteAppointment = async (id) => {
  return await axiosInstance.delete(`/appointments/${id}`);
};

export const updateAppointment = async (id, appointment) => {
  return await axiosInstance.get(`/appointments/${id}`, appointment);
};
