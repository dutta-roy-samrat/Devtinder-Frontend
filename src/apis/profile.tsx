import axiosInstance from "@services/axios/client";

export const fetchProfile = async () => {
  const response = await axiosInstance.get("/profile");
  return response.data.data;
};

