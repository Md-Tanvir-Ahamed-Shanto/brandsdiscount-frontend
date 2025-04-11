export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/';
export const SITE_DOMAIN =
    process.env.NEXT_PUBLIC_SITE_DOMAIN || 'http://localhost:3000/';

export const STRIPE_SECRET_KEY =
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '';
export const STRIPE_PUBLISHABLE_KEY =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

export const ACCESS_TOKEN_EXPIRY =
    Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY) * 10000000;
export const REFRESH_TOKEN_EXPIRY =
    Number(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY) * 1000000;
