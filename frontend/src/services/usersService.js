import { axiosInstance } from "./axiosInstance";

export const getUserById = async (id) => {
  return await axiosInstance.get(`/users/${id}?_expand=professional`);
};

export const getUsers = async () => {
  return await axiosInstance.get(`/users`);
};

export const updateUser = async (id, user) => {
  return await axiosInstance.patch(`/users/${id}`, user);
};

export const createUser = async (user) => {
  return await axiosInstance.post(`/users`, user);
};

export const deleteUser = async (id) => {
  return await axiosInstance.delete(`/users/${id}`);
};
