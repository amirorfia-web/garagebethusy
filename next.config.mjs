/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.autoscout24.com',
      },
    ],
  },
  // Augmenter la taille max du body pour l'upload d'images (10 MB)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}

export default nextConfig
