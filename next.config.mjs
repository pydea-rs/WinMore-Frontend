/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      minify: true,
      ssr: false,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        port: '8000',
        protocol: 'http',
      },
      {
        hostname: 'placehold.co',
        protocol: 'https',
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
  },
}

export default nextConfig
