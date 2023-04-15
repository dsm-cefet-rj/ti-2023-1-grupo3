import { axiosInstance } from "./axiosInstance";

export const getLocationsByProfessionalId = async (id) => {
  return await axiosInstance.get(
    `/locations?professionalId=${id}&_expand=professional`
  );
};
