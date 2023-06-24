/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    serverActions: true,
  },
  // reactStrictMode: false,
};

module.exports = nextConfig;
