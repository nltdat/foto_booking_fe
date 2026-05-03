"use client";

import { useLayoutEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function AuthBootstrap() {
  const hydrateFromStorage = useAuthStore((state) => state.hydrateFromStorage);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      hydrateFromStorage();
    }
  }, [hydrateFromStorage]);

  return null;
}
