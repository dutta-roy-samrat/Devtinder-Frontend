import axiosServerInstance from "@services/axios/server";
import { handleAuthApiRequest } from "@helpers/next-api";

export async function POST(request: Request) {
  const body = await request.json();
  return handleAuthApiRequest(() => axiosServerInstance.post("/auth/login", body));
}
