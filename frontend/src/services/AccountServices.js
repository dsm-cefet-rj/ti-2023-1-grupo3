import { axiosInstance } from "./axiosInstance";

export const getProfessionalById = async (id) => {
  return await axiosInstance.get(`/users/${id}?_expand=user`);
};

