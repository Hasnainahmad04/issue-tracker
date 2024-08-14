/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
        pathname: '**',
        port: '',
        protocol: 'http',
      },
    ],
  },
};

export default nextConfig;
