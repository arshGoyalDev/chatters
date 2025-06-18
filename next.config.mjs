/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from backend server
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/**',
      },
    ],
    // Nextjs Server can't access the backend on docker
    // it work locally
    // will fix it later
    unoptimized: true,
  },
}

export default nextConfig;
