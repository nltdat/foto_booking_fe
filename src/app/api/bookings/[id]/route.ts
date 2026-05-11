import http from "node:http";
import https from "node:https";
import { getServerApiBaseUrl } from "@/lib/server-api";

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

function getBackendHostHeader(url: URL): string {
  if (process.env.API_HOST_HEADER) {
    return process.env.API_HOST_HEADER;
  }

  if (url.hostname === "host.docker.internal") {
    return `localhost${url.port ? `:${url.port}` : ""}`;
  }

  return url.host;
}

async function proxyGet(url: URL, headers: Record<string, string>): Promise<Response> {
  const transport = url.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    const request = transport.request(
      url,
      {
        method: "GET",
        headers: {
          ...headers,
          Host: getBackendHostHeader(url)
        }
      },
      (backendResponse) => {
        const chunks: Buffer[] = [];

        backendResponse.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });

        backendResponse.on("end", () => {
          resolve(
            new Response(Buffer.concat(chunks), {
              status: backendResponse.statusCode ?? 500,
              headers: {
                "Content-Type": backendResponse.headers["content-type"] ?? "application/json"
              }
            })
          );
        });
      }
    );

    request.on("error", reject);
    request.end();
  });
}

export async function GET(request: Request, { params }: RouteContext): Promise<Response> {
  try {
    const backendUrl = new URL(`${getServerApiBaseUrl()}/api/bookings/${encodeURIComponent(params.id)}/`);

    return await proxyGet(backendUrl, getAuthHeader(request));
  } catch {
    return Response.json(
      { detail: "Không thể tải chi tiết buổi chụp." },
      { status: 500 }
    );
  }
}
