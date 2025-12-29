import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      Prerender({
        staticDir: path.resolve(__dirname, "dist"),
        routes: [
          "/insights",
          "/insights/proof-of-business-activity",
          "/insights/sales-increase",
          "/insights/marketplace-seller-info",
          "/insights/source-of-funds",
          "/insights/industry-verification",
          "/insights/international-sales",
          "/insights/contracts-invoices",
        ],
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
