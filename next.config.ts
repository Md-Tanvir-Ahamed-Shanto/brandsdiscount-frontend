import withPWAInit from '@ducanh2912/next-pwa';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "imagedelivery.net",
                pathname: "/uaALX6FE2lVFAKXACq-6eQ/**",
            },
        ],
    },
};

export { nextConfig };

const withPWA = withPWAInit({
    dest: 'public',
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true
    }
});

export default withPWA(nextConfig);
