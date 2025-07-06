import { jwtVerify } from "jose";

import { JWT_SECRET } from "@constants/env-variables";

export const isTokenValid = async (token: string): Promise<boolean> => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET || "");
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};
