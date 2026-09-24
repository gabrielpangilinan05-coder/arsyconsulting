import type { NextConfig } from "next";

const isCpanel = process.env.DEPLOY_TARGET === "cpanel";

const nextConfig: NextConfig = {
  // Apache/cPanel serves folders cleanly as /path/index.html
  trailingSlash: true,
  ...(isCpanel
    ? {
        output: "export" as const,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
