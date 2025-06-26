
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  distDir: 'dist',
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
