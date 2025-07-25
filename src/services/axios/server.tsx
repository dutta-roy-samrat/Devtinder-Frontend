import axios from "axios";
import { cookies } from "next/headers";

const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosServerInstance.interceptors.request.use((config) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : null,
    refreshToken ? `refreshToken=${refreshToken}` : null,
  ]
    .filter(Boolean)
    .join("; ");
  if (cookieHeader) {
    config.headers = config.headers || {};
    config.headers["Cookie"] = cookieHeader;
  }
  return config;
});

export default axiosServerInstance;
