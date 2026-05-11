import { proxyJsonRequest } from "@/lib/server-json-proxy";

function getAuthHeader(request: Request): Record<string, string> {
  const authorization = request.headers.get("authorization");
  return authorization ? { Authorization: authorization } : {};
}

async function proxyResponse(response: Response): Promise<Response> {
  const contentType = response.headers.get("content-type") ?? "application/json";
  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": contentType
    }
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.text();
    const response = await proxyJsonRequest({
      pathname: "/api/auth/change-password/",
      body,
      headers: {
        ...getAuthHeader(request),
        "Content-Type": request.headers.get("content-type") ?? "application/json"
      }
    });

    return proxyResponse(response);
  } catch {
    return Response.json(
      { detail: "Không thể đổi mật khẩu. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
