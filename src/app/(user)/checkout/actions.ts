'use server';
import { stripe } from '@/lib/stripe';

// type CartItem = {
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
// };

export async function createCheckoutSession(finalAmount: number) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Order Payment'
                    },
                    unit_amount: Math.round(finalAmount * 100) // in cents
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_LIVE_SITE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_LIVE_SITE_URL || 'http://localhost:3000'}`
    });

    return { sessionId: session.id };
}

export async function getSessionStatus(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return { status: session.payment_status, session: session };
}
