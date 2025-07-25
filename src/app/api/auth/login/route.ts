import { AxiosError } from "axios";
import { NextResponse } from "next/server";

import axiosInstance from "@services/axios/client";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const response = await axiosInstance.post("/auth/login", data);
    const res = NextResponse.json({
      status: 200,
      data: response.data,
    });

    const setCookie = response.headers["set-cookie"];
    if (setCookie) {
      if (Array.isArray(setCookie)) {
        setCookie.forEach((cookie) => res.headers.append("set-cookie", cookie));
      } else {
        res.headers.set("set-cookie", setCookie);
      }
    }
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({
        status: error.status,
        data: { message: error.message },
      });
    }
    return NextResponse.json({
      status: 500,
      data: { message: "Internal Server Error" },
    });
  }
}
