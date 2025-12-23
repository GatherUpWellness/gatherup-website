import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/our-solutions',
        destination: '/our-commercial-solutions',
        permanent: true,
      },
      {
        source: '/our-solutions/residential',
        destination: '/our-residential-solutions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
