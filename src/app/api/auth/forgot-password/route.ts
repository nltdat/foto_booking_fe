import { proxyJsonRequest } from "@/lib/server-json-proxy";

export async function POST(request: Request): Promise<Response> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const controller = new AbortController();

  try {
    const body = await request.json();
    timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await proxyJsonRequest({
      pathname: "/api/auth/forgot-password/",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return Response.json(
        {
          detail: "Yêu cầu gửi email đặt lại mật khẩu đã hết thời gian. Vui lòng thử lại."
        },
        { status: 504 }
      );
    }

    return Response.json(
      {
        detail: "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại."
      },
      { status: 500 }
    );
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
