import { axiosInstance } from "./axiosInstance";

export const getPaginatedProfessionals = async (searchName, page, limit) => {
  return await axiosInstance.get(
    `/professionals?name_like=${searchName}&_page=${page}&_limit=${limit}`
  );
};

export const getHighestRatedProfessionals = async () => {
  return await axiosInstance.get(
    `/professionals?_sort=rating&_order=desc&_limit=5`
  );
};

export const getProfessionalById = async (id) => {
  return await axiosInstance.get(`/professionals/${id}`);
};

export const updateProfessional = async (id, professional) => {
  return await axiosInstance.get(`/professionals/${id}`, professional);
};
