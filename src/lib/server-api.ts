function normalizeBaseUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getServerApiBaseUrl(): string {
  const value = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

  if (!value) {
    if (process.env.NODE_ENV === "development") {
      return normalizeBaseUrl("http://localhost:8000");
    }

    throw new Error("API base URL is required. Set API_URL or NEXT_PUBLIC_API_URL.");
  }

  return normalizeBaseUrl(value);
}
