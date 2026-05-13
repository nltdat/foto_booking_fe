import { getServerApiBaseUrl } from "@/lib/server-api";

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

export async function GET(): Promise<Response> {
  try {
    const response = await fetch(`${getServerApiBaseUrl()}/api/locations/`, {
      method: "GET",
      cache: "no-store"
    });

    return proxyResponse(response);
  } catch {
    return Response.json(
      { detail: "Không thể tải danh sách địa điểm." },
      { status: 500 }
    );
  }
}
