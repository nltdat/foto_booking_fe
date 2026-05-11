import { proxyJsonRequest } from "@/lib/server-json-proxy";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const response = await proxyJsonRequest({
      pathname: "/api/auth/reset-password/",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      {
        detail: "Không thể đặt lại mật khẩu. Vui lòng thử lại."
      },
      { status: 500 }
    );
  }
}
