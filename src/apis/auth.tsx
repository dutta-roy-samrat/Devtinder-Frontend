import { z } from "zod";

import { feAxiosInstance } from "@services/axios/client";

import { RegisterUserSchema } from "@schema-validations/register-user";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await feAxiosInstance.post("/api/auth/login", data);
  return response.data;
};

export const logoutApi = async () => {
  const response = await feAxiosInstance.post("/api/auth/logout");
  return response.data;
};

export const registerUserApi = async (
  data: z.infer<typeof RegisterUserSchema>,
) => {
  const response = await feAxiosInstance.post("/api/auth/register", data);
  return response.data;
};
