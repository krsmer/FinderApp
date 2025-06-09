/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.backblazeb2.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'finder-storage.s3.us-east-005.backblazeb2.com',
        pathname: '**',
      }
    ],
  }
}

module.exports = nextConfig