import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isStudioEnabled = process.env.ENABLE_STUDIO === "true";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: isStudioEnabled
      ? {}
      : {
          "next-sanity/studio": "./lib/studio/next-studio-disabled.tsx",
        },
  },
};

export default withBundleAnalyzer(nextConfig);
