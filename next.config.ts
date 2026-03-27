import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcxlqzgjzxspqfupzemc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Kita hapus bagian experimental: { turbopack: ... }
  // karena Next.js akan mendeteksi root otomatis setelah lockfile luar dihapus.
};

export default nextConfig;
