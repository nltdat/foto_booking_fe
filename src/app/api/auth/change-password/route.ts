import { getServerApiBaseUrl } from "@/lib/server-api";

function getAuthHeader(request: Request): HeadersInit {
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
    const response = await fetch(`${getServerApiBaseUrl()}/api/auth/change-password/`, {
      method: "POST",
      headers: {
        ...getAuthHeader(request),
        "Content-Type": request.headers.get("content-type") ?? "application/json"
      },
      body,
      cache: "no-store"
    });

    return proxyResponse(response);
  } catch {
    return Response.json(
      { detail: "Không thể đổi mật khẩu. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
