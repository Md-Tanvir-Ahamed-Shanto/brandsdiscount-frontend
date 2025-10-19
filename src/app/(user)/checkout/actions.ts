'use server';
import { stripe } from '@/lib/stripe';

// type CartItem = {
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
// };

export async function createCheckoutSession(finalAmount: number) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Brands Discounts Order',
                            description: 'Your purchase from Brands Discounts'
                        },
                        unit_amount: Math.round(finalAmount * 100) // in cents
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            payment_intent_data: {
                capture_method: 'automatic',
                setup_future_usage: 'on_session'
            },
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB']
            },
            success_url: `${process.env.NEXT_PUBLIC_LIVE_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_LIVE_SITE_URL}/checkout`
        });

        return { sessionId: session.id };
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw new Error('Failed to create checkout session');
    }
}

export async function getSessionStatus(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return { status: session.payment_status, session: session };
}
