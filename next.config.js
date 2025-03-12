const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "g-mxtlc2zquep.vusercontent.net",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "ccn-demo.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
