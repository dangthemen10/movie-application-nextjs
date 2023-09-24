/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  // experimental: {
  //   appDir: true
  // },
  images: {
    domains: ['image.tmdb.org', 'drive.google.com']
  }
};

module.exports = nextConfig;
