import axiosInstance from "@services/axios/client";

export const fetchProfile = async () => {
  const response = await axiosInstance.get("/profile");
  return response.data;
};

export const updateProfileApi = async (data: any) => {
  const response = await axiosInstance.patch("/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchProfileById = async (id: string) => {
  const response = await axiosInstance.get(`/profile?id=${id}`);
  return response.data;
};
