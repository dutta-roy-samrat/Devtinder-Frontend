import { AxiosError } from "axios";
import { NextResponse } from "next/server";

type HandlerOptions = {
  onSuccess?: (response: any, res: NextResponse<{ data: any }>) => NextResponse<{ data: any }>;
  status?: number;
};

export async function handleAuthApiRequest(
  axiosCall: () => Promise<any>,
  options: HandlerOptions = {}
) {
  try {
    const response = await axiosCall();

    let res: NextResponse<{ data: any }> = NextResponse.json(
      { data: response.data },
      { status: options.status ?? 200 }
    );

    const setCookie = response.headers["set-cookie"];
    if (setCookie) {
      if (Array.isArray(setCookie)) {
        setCookie.forEach((cookie: string) => res.headers.append("set-cookie", cookie));
      } else {
        res.headers.set("set-cookie", setCookie);
      }
    }

    if (options.onSuccess) {
      res = options.onSuccess(response, res);
    }

    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { data: { message: error?.response?.data?.message } },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { data: { message: "Internal Server Error" } },
      { status: 500 }
    );
  }
} 