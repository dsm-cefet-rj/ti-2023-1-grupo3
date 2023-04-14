import { axiosInstance } from "./axiosInstance";

export const getPaginatedProfessionals = async (searchName, page, limit) => {
  return await axiosInstance.get(
    `/professionals?name_like=${searchName}&_page=${page}&_limit=${limit}`
  );
};

export const getProfessionalById = async (id) => {
  return await axiosInstance.get(`/professionals/${id}`);
};
