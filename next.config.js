/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        // No need to configure `config.node` in Webpack 5
      }
  
      return config;
    }
  }
  
  module.exports = nextConfig;