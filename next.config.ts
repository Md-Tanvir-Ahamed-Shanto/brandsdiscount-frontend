import withPWAInit from '@ducanh2912/next-pwa';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   
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

export default withPWA({
    reactStrictMode: true
});
