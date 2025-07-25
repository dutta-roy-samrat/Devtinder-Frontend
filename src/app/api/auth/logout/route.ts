import axiosServerInstance from "@services/axios/server";
import { handleAuthApiRequest } from "@helpers/next-api";

export async function POST(request: Request) {
  return handleAuthApiRequest(
    () => axiosServerInstance.post("/auth/logout")
  );
}
