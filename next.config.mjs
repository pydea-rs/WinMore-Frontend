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
    ],
  },
}

export default nextConfig
