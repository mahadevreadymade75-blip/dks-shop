/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // ✅ ADD THIS - Allow Cloudinary images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // Performance Optimizations
  compress: true,
  
  // Experimental Features for Speed
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },

  // Production Optimizations
  productionBrowserSourceMaps: false,
  
  // Compiler Options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // React Strict Mode
  reactStrictMode: true,
};

module.exports = nextConfig;