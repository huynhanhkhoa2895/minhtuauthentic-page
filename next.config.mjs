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
  },
  transpilePackages: ['antd', '@ant-design',  "rc-util",
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "rc-pagination",
    "rc-picker",
    "rc-tree",
    "rc-table",],
};

export default nextConfig;
