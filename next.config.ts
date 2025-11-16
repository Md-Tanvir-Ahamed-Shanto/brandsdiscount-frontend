import withPWAInit from '@ducanh2912/next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'cdn.brandsdiscounts.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
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
    disable: true, // Disable PWA since we removed the service worker
    workboxOptions: {
        disableDevLogs: true
    }
});

export default withPWA(nextConfig);
