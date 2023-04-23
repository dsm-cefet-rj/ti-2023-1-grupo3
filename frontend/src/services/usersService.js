import { axiosInstance } from "./axiosInstance";

export const getUserById = async (id) => {
  return await axiosInstance.get(`/users/${id}?_expand=professional`);
};
