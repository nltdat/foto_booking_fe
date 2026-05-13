import { proxyJsonRequest } from "@/lib/server-json-proxy";

export const runtime = "nodejs";

type RouteContext = {
  params: {
    id: string;
  };
};

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

async function proxyFavorite(
  request: Request,
  context: RouteContext,
  method: "POST" | "DELETE"
): Promise<Response> {
  try {
    const response = await proxyJsonRequest({
      pathname: `/api/photographers/${context.params.id}/favorite/`,
      method,
      headers: getAuthHeader(request),
      signal: request.signal
    });

    return proxyResponse(response);
  } catch {
    return Response.json(
      { detail: "Không thể cập nhật yêu thích." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, context: RouteContext): Promise<Response> {
  return proxyFavorite(request, context, "POST");
}

export async function DELETE(request: Request, context: RouteContext): Promise<Response> {
  return proxyFavorite(request, context, "DELETE");
}
