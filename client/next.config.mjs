/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
    // it works locally
    // will fix it later
    unoptimized: true, // remove this for local development
  },
}

export default nextConfig;
