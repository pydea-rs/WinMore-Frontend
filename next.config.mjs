/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      minify: true,
      ssr: false,
    },
  },
  compress: true,
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
    MAIN_PUBLIC_KEY: process.env.MAIN_PUBLIC_KEY,
  },
}

export default nextConfig
