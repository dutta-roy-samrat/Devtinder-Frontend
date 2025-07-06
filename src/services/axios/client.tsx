import { createAxiosInstance } from "./create-instance";

const axiosClientInstance = createAxiosInstance({
  setToken: (token: string) => {
    document.cookie = `accessToken=${token}; path=/; max-age=3600;SameSite=None;Secure`;
  },
});

export default axiosClientInstance;
