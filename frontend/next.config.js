
/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  },
}

module.exports = nextConfig
