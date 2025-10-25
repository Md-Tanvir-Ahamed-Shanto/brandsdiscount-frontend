export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.brandsdiscounts.com';
export const SITE_DOMAIN =
    process.env.NEXT_PUBLIC_SITE_DOMAIN || 'http://localhost:3000/';

// CRITICAL: Stripe secret key should NEVER be exposed to client-side
// Use server-side environment variable without NEXT_PUBLIC_ prefix
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';
export const SCANDIT_KEY = process.env.NEXT_PUBLIC_SCANDIT_KEY;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
