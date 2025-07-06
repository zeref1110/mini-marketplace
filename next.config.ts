// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'ohkdjrzvzhbdukpfvehh.supabase.co',
      'via.placeholder.com', 
    ], // ✅ No https://
  },
};

export default nextConfig;
