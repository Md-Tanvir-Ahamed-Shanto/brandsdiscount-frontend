'use server';
import { stripe } from '@/lib/stripe';

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

export async function createCheckoutSession(items: CartItem[]) {
    // Create line items for Stripe
    const lineItems = items.map((item) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100 // Stripe expects amounts in cents
        },
        quantity: item.quantity
    }));

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}`
    });

    // Return the session ID
    return { sessionId: session.id };
}

export async function getSessionStatus(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return { status: session.payment_status, session: session };
}
