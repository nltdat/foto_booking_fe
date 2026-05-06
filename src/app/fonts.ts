import localFont from "next/font/local";

export const manrope = localFont({
  src: [
    {
      path: "./assets/fonts/Manrope-Variable.ttf",
      weight: "400 800",
      style: "normal"
    }
  ],
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"]
});
