/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stripe } from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from '@/config';

// Initialize Stripe on the server side
export const stripe = new Stripe(STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
    appInfo: {
        name: 'Brands Discounts',
        version: '1.0.0'
    }
});

// Initialize Stripe on the client side (singleton pattern)
let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!, {
          
            stripeAccount: process.env.NODE_ENV === 'production' ? undefined : 'test',
        });
    }
    return stripePromise;
};
