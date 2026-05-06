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

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const response = await fetch(
      `${getServerApiBaseUrl()}/api/photographers/${url.search}`,
      {
        method: "GET",
        headers: getAuthHeader(request),
        cache: "no-store"
      }
    );

    return proxyResponse(response);
  } catch {
    return Response.json(
      { detail: "Không thể tải danh sách nhiếp ảnh gia." },
      { status: 500 }
    );
  }
}
