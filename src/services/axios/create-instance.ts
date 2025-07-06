import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";

import { API_URL } from "@constants/env-variables";

export const createAxiosInstance = ({
  setToken,
  config,
}: {
  config?: AxiosRequestConfig;
  setToken?: (token: string) => void;
} = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  instance.interceptors.request.use((config) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("config", config);
    } catch (error) {
      console.error("Error getting access token from localStorage:", error);
    }
    return config;
  });

  instance.interceptors.response.use(
    async (response) => {
      const accessToken = response.headers["x-access-token"];

      if (accessToken) {
        try {
          await setToken?.(accessToken);
        } catch (error) {
          console.error("Error setting access token in localStorage:", error);
        }
      }
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        redirect("/login");
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
