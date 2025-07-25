import { AxiosError } from "axios";
import { NextResponse } from "next/server";

import axiosServerInstance from "@services/axios/server";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const response = await axiosServerInstance.post("/auth/login", data);
    const res = NextResponse.json(
      {
        data: response.data,
      },
      {
        status: 200,
      },
    );

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
    console.log(error, "kklop");
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          data: { message: error?.response?.data?.message },
        },
        {
          status: error.status,
        },
      );
    }
    return NextResponse.json(
      {
        data: { message: "Internal Server Error" },
      },
      {
        status: 500,
      },
    );
  }
}
