"use server";

import { cookies } from "next/headers";

export const getServerCookieByName = (name: string) => {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value;
};
