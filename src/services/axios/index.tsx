import { createAxiosInstance } from "@services/axios/create-instance";
import { cookies } from "next/headers";

const axiosInstance = createAxiosInstance({
  setToken: async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", token, {
      path: "/",
      maxAge: 3600,
      sameSite: "none",
      secure: true,
    });
  },
});

export default axiosInstance;
