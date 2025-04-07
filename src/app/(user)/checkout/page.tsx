'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getStripe } from '@/lib/stripe';
import { createCheckoutSession } from './actions';

export default function Checkout() {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const product = [
                {
                    id: 'prod_static',
                    name: 'Test Productsss',
                    price: 99.99,
                    quantity: 1
                }
            ];
            const { sessionId } = await createCheckoutSession(product);
            const stripe = await getStripe();
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Button onClick={handleCheckout} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Checkout'}
            </Button>
        </div>
    );
}
