import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  console.warn(`Invalid PORT value: "${rawPort}". Falling back to 5173.`);
}

const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
      ? [
        await import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer({
            root: path.resolve(import.meta.dirname, ".."),
          }),
        ),
        await import("@replit/vite-plugin-dev-banner").then((m) =>
          m.devBanner(),
        ),
      ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      "@tanstack/react-query": path.resolve(
        import.meta.dirname,
        "node_modules",
        "@tanstack",
        "react-query"
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-is/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor";
          }
          if (id.includes("node_modules/framer-motion/")) {
            return "framer";
          }
          if (id.includes("node_modules/lucide-react/") || id.includes("node_modules/react-icons/")) {
            return "icons";
          }
          if (id.includes("node_modules/@radix-ui/")) {
            return "ui";
          }
          if (id.includes("node_modules/@tanstack/")) {
            return "query";
          }
          if (id.includes("node_modules/date-fns/") || id.includes("node_modules/react-day-picker/")) {
            return "dates";
          }
          if (id.includes("node_modules/zod/") || id.includes("node_modules/react-hook-form/") || id.includes("node_modules/@hookform/")) {
            return "forms";
          }
          if (id.includes("node_modules/")) {
            return "deps";
          }
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});