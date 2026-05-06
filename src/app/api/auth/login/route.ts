import { getServerApiBaseUrl } from "@/lib/server-api";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const response = await fetch(`${getServerApiBaseUrl()}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      {
        detail: "Đăng nhập thất bại. Vui lòng thử lại."
      },
      { status: 500 }
    );
  }
}
