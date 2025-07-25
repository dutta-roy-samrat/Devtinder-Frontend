import { getServerCookieByName } from "@helpers/cookies/server";
import createInstance from "./instance";

const axiosServerInstance = createInstance({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  getCookieByName: getServerCookieByName,
});

export default axiosServerInstance;
