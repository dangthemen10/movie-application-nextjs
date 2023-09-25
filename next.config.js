/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  // experimental: {
  //   appDir: true
  // },
  images: {
    domains: [
      'image.tmdb.org',
      'drive.google.com',
      'img.freepik.com',
      'lh3.googleusercontent.com'
    ]
  }
};

module.exports = nextConfig;
