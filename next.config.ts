import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'picsum.photos',
      'www.anilibria.tv',
      'anilibria.tv',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '164.90.185.95',
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api-storage/:path*',
        destination: 'http://164.90.185.95/storage/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https: http:;
              font-src 'self' https: data:;
              frame-src 'self' https: http:;
              connect-src 'self' http://164.90.185.95 https://covers-determination-compliance-outlets.trycloudflare.com;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;