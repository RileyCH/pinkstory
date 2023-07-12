/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "i.pinimg.com",
      "scontent.ftpe7-4.fna.fbcdn.net",
    ],
  },
  experimental: {
    serverActions: true,
  },
  // reactStrictMode: true,
};

module.exports = nextConfig;
