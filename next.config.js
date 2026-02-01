/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimizācija Supabase public bucket
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nxwuihxgyiqwdffyfett.supabase.co',
        pathname: '/storage/v1/object/public/sludinajumi/**',
      },
      {
        protocol: 'https',
        hostname: 'nxwuihxgyiqwdffyfett.supabase.co',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Vercel optimizācijas
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },

  // Swc minify ātrumam
  swcMinify: true,

  // Environment specifika
  env: {
    customKey: 'Tekvibe Production',
  },

  // Headers CORS ja vajag (Supabase jau public)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

  // Output static Vercel
  output: process.env.VERCEL_ENV === 'production' ? 'export' : undefined,
};

module.exports = nextConfig;
