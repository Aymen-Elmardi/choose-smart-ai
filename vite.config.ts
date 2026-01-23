import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function versionJsonPlugin(payload: string) {
  return {
    name: "chosepayments-version-json",
    // Dev server: serve /version.json dynamically (no public file needed)
    configureServer(server: any) {
      server.middlewares.use("/version.json", (_req: any, res: any) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        res.end(payload);
      });
    },
    // Production build: emit /version.json into the dist root
    generateBundle(this: any) {
      this.emitFile({
        type: "asset",
        fileName: "version.json",
        source: payload,
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const buildTime = new Date().toISOString();
  const payload = JSON.stringify(
    {
      version: buildTime,
      buildTime,
    },
    null,
    2
  );

  return {
    // Expose the current build timestamp to the client bundle so we can detect
    // when a cached tab is running an older build than the server.
    define: {
      __APP_BUILD_TIME__: JSON.stringify(buildTime),
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger(), versionJsonPlugin(payload)].filter(
      Boolean
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Ensure unique chunk names based on content hash for cache busting
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
    },
  };
});
