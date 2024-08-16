/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'dxjbczsdslixqoiaqknx.supabase.co',
        pathname: '**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
