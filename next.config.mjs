/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ap.rdcpix.com",
        // port: "",
        pathname: "**",
      },
    ],
  },
};
// module.exports = {

// };
export default nextConfig;
