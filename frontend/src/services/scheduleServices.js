import { axiosInstance } from "./axiosInstance";

export const getPaginatedAppointments = async (searchName, page, limit) => {
  return await axiosInstance.get(
    `/appointments?name_like=${searchName}&_page=${page}&_limit=${limit}`
  );
};

export const getAppointmentById = async (id) => {
  return await axiosInstance.get(`/appointments/${id}`);
};

export const updateAppointment = async (id, appointment) => {
  return await axiosInstance.get(`/appointments/${id}`, appointment);
};
