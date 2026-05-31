import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Workers deployment (assets served via wrangler)
  // Redirects and headers are handled by public/_redirects and public/_headers
  output: 'export',

  // Skip the auto-generated validator.ts type check during build.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

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
