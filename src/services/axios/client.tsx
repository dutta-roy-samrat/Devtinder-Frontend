import { getClientCookieByName } from "@helpers/cookies/client";
import createInstance from "./instance";

const axiosInstance = createInstance({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  getCookieByName: getClientCookieByName,
});
const feAxiosInstance = createInstance({
  baseURL: process.env.NEXT_PUBLIC_FE_API_URL as string,
  getCookieByName: getClientCookieByName,
});

export default axiosInstance;
export { feAxiosInstance };
