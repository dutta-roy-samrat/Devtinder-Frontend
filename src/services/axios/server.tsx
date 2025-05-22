import axios from "axios";
import { cookies } from "next/headers";

const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Cookie: cookies().toString(),
  },
});

export default axiosServerInstance;
