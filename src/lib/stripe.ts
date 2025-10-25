/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stripe } from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from '@/config';

// Validate environment variables
if (!STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is required but not found in environment variables');
}

if (!STRIPE_PUBLISHABLE_KEY) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required but not found in environment variables');
}

// Initialize Stripe on the server side
export const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia', // Use a valid API version
    appInfo: {
        name: 'Brands Discounts',
        version: '1.0.0'
    },
    typescript: true
});

// Initialize Stripe on the client side (singleton pattern)
let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!, {
            // Remove invalid stripeAccount configuration
            // stripeAccount should only be used for Connect accounts
        });
    }
    return stripePromise;
};
