/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require('./next-i18next.config');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});
module.exports = {
  reactStrictMode: true, 
  images: {
    domains: ['res.cloudinary.com','i.postimg.cc','i.ibb.co'],
  },
}
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','i.postimg.cc','i.ibb.co'],
  },
  i18n,
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
});
