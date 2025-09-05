import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        hostname:'https://lh3.googleusercontent.com'
      },
      {
        hostname: "res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;
