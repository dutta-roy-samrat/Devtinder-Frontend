import { AxiosError } from "axios";
import { NextResponse } from "next/server";

import axiosInstance from "@services/axios/client";

function setDomainOnCookie(cookieStr: string) {
  if (/domain=/i.test(cookieStr)) return cookieStr;
  return cookieStr.replace(/;\s*Path=/i, `; Domain=devtinder-backend-zk4v.onrender.com; Path=`);
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const response = await axiosInstance.post("/auth/login", data);
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
        setCookie.forEach((cookie) => {
          res.headers.append("set-cookie", setDomainOnCookie(cookie));
        });
      } else {
        res.headers.set("set-cookie", setDomainOnCookie(setCookie));
      }
    }
    return res;
  } catch (error) {
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
