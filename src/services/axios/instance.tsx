import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { redirect } from "next/navigation";

function createInstance({
  baseURL,
  getCookieByName,
}: {
  baseURL: string;
  getCookieByName: (name: string) => string | undefined;
}): AxiosInstance {
  const instance = axios.create({ baseURL });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      const accessToken = getCookieByName("accessToken");
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;
      const refreshToken = getCookieByName("refreshToken");

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (refreshToken) {
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_FE_API_URL}/api/auth/refresh_token`,
              { refreshToken },
            );
            return instance(originalRequest);
          } catch (refreshError: any) {
            const errorMsg =
              refreshError.response?.data?.message || "Failed to refresh token";
            if (typeof window !== "undefined") {
              window.location.href = `/login?error=${encodeURIComponent(errorMsg)}`;
            } else {
              redirect("/login");
            }
            return Promise.reject(error);
          }
        } else {
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          } else {
            redirect("/login");
          }
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
}

export default createInstance;
