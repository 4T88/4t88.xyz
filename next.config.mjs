/** @type {import('next').NextConfig} */
const repoName = '4t88.xyz';
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
