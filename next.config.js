/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
        unoptimized: true
    }
},
 resolve: {
  fallback: {
      "fs": false
  },
}
}

module.exports = nextConfig
