/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ['api.neshan.org'],
  },
};

module.exports = nextConfig;
