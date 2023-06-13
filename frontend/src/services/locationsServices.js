import { axiosInstance } from "./axiosInstance";

export const getLocations = async () => {
  return await axiosInstance.get(`/locations?_expand=user&_embed=locations`);
};

export const updateLocation = async (id, location) => {
  return await axiosInstance.patch(`/locations/${id}?_expand=user`, location);
};

export const createLocation = async (location) => {
  return await axiosInstance.post(`/locations?_expand=user`, location);
};

export const deleteLocation = async (id) => {
  return await axiosInstance.delete(`/locations/${id}`);
};
