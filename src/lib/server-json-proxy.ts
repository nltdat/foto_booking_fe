import http from "node:http";
import https from "node:https";
import { getServerApiBaseUrl } from "@/lib/server-api";

type ProxyJsonRequestInput = {
  pathname: string;
  method?: "POST" | "GET";
  body?: string;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

function getBackendUrls(pathname: string): URL[] {
  const baseUrl = getServerApiBaseUrl();
  const urls = [new URL(`${baseUrl}${pathname}`)];

  if (baseUrl.includes("://host.docker.internal")) {
    urls.push(new URL(`${baseUrl.replace("://host.docker.internal", "://localhost")}${pathname}`));
  }

  return urls;
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

function requestBackend(url: URL, input: ProxyJsonRequestInput, signal?: AbortSignal): Promise<Response> {
  const transport = url.protocol === "https:" ? https : http;
  const body = input.body ?? "";

  return new Promise((resolve, reject) => {
    const request = transport.request(
      url,
      {
        method: input.method ?? "POST",
        signal,
        headers: {
          ...input.headers,
          ...(body ? { "Content-Length": Buffer.byteLength(body) } : {}),
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
    request.end(body);
  });
}

export async function proxyJsonRequest(input: ProxyJsonRequestInput): Promise<Response> {
  let response: Response | null = null;

  for (const url of getBackendUrls(input.pathname)) {
    try {
      response = await requestBackend(url, input, input.signal);
      break;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }

      response = null;
    }
  }

  if (!response) {
    throw new Error("Unable to reach backend service.");
  }

  return response;
}
