import { axiosInstance } from "./axiosInstance";

export const getProfessionals = async () => {
  return await axiosInstance.get(`/professionals`);
};

export const updateProfessional = async (id, professional) => {
  return await axiosInstance.patch(`/professionals/${id}`, professional);
};

export const createProfessional = async (professional) => {
  return await axiosInstance.post(`/professionals`, professional);
};

export const deleteProfessional = async (id) => {
  return await axiosInstance.delete(`/professionals/${id}`);
};
