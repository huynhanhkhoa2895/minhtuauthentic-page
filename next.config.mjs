/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ['s3.ap-southeast-1.amazonaws.com','localhost','admin.mikiperfume.com','minhtuauthentic-be.hak-app.com'],
  }
};

export default nextConfig;
