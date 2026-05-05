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
    const response = await fetch(`${getServerApiBaseUrl()}/api/users/me/`, {
      method: "GET",
      headers: getAuthHeader(request),
      cache: "no-store"
    });

    return proxyResponse(response);
  } catch {
    return Response.json(
      { detail: "Không thể lấy thông tin người dùng." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const response = await fetch(`${getServerApiBaseUrl()}/api/users/me/`, {
      method: "PATCH",
      headers: getAuthHeader(request),
      body: formData,
      cache: "no-store"
    });

    return proxyResponse(response);
  } catch {
    return Response.json(
      { detail: "Không thể cập nhật thông tin người dùng." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request): Promise<Response> {
  try {
    const body = await request.text();
    const response = await fetch(`${getServerApiBaseUrl()}/api/users/me/`, {
      method: "DELETE",
      headers: {
        ...getAuthHeader(request),
        ...(body ? { "Content-Type": request.headers.get("content-type") ?? "application/json" } : {})
      },
      body: body || undefined,
      cache: "no-store"
    });

    return proxyResponse(response);
  } catch {
    return Response.json(
      { detail: "Không thể xóa tài khoản. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
