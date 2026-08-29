import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Workers deployment (assets served via wrangler)
  // Redirects and headers are handled by public/_redirects and public/_headers
  output: 'export',

  // Type and lint errors fail the build. They were ignored while the Vite-era
  // SPA source still sat in the tree and could not compile; that code is gone.

  // next/image optimisation requires a server; disable for static export
  images: {
    unoptimized: true,
  },

  // Expose build time to client
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
}

export default nextConfig
