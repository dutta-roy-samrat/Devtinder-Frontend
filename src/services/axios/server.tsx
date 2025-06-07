import axios from "axios";
import { cookies } from "next/headers";

export const getAxiosServerInstance = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });
};