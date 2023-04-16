import { axiosInstance } from "./axiosInstance";

export const createAppointment = async (appointment) => {
  return await axiosInstance.post("/appointments", appointment);
};
