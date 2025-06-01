import withPWAInit from '@ducanh2912/next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                port: '', // Optional, only if needed
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'cdn.brandsdiscounts.com',
                pathname: '/**'
            }
        ]
    }
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
