import http from "node:http";
import https from "node:https";
import { getServerApiBaseUrl } from "@/lib/server-api";

export const runtime = "nodejs";

const TIMEOUT_MS = 10_000;

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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let settled = false;

    const clearRequestTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const resolveResponse = (response: Response) => {
      if (settled) {
        return;
      }

      settled = true;
      clearRequestTimeout();
      resolve(response);
    };

    const rejectRequest = (error: unknown) => {
      if (settled) {
        return;
      }

      settled = true;
      clearRequestTimeout();
      reject(error);
    };

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
            resolveResponse(
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

    request.on("error", rejectRequest);
    request.end(() => {
      if (settled) {
        return;
      }

      timeoutId = setTimeout(() => {
        const timeoutError = new Error("Upstream request timed out");
        request.destroy(timeoutError);
        rejectRequest(timeoutError);
      }, TIMEOUT_MS);
    });
  });
}

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const backendUrl = new URL(`${getServerApiBaseUrl()}/api/bookings${url.search}`);

    const response = await proxyGet(backendUrl, getAuthHeader(request));
    return response;
  } catch (err) {
    console.error("Unable to proxy bookings request.", err);
    return Response.json(
      { detail: "Không thể tải danh sách buổi chụp." },
      { status: 502 }
    );
  }
}
