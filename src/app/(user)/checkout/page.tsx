'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getStripe } from '@/lib/stripe';
import { createCheckoutSession } from './actions';

// Define our products
const products = [
    {
        id: 'prod_1',
        name: 'Premium Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 149.99,
        image: '/placeholder.svg?height=200&width=200'
    },
    {
        id: 'prod_2',
        name: 'Smart Watch',
        description:
            'Feature-rich smartwatch with health tracking and notifications',
        price: 199.99,
        image: '/placeholder.svg?height=200&width=200'
    }
];

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState<
        { id: string; name: string; price: number; quantity: number }[]
    >([]);

    const addToCart = (product: (typeof products)[0]) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [
                    ...prevCart,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1
                    }
                ];
            }
        });
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            // Create a checkout session
            const { sessionId } = await createCheckoutSession(cart);

            // Redirect to Stripe Checkout
            const stripe = await getStripe();
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <main className='container mx-auto py-10 px-4'>
            <h1 className='text-3xl font-bold mb-8 text-center'>
                Our Products
            </h1>

            <div className='mb-12'>
                <h3>Test Card Details:</h3>
                <h3>Card: 4242 4242 4242 4242 </h3>
                <h3>Ex: 12/25 </h3>
                <h3>CVV: 123 </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-10'>
                {products.map((product) => (
                    <div key={product.id} className='overflow-hidden'>
                        <div>
                            <div>{product.name}</div>
                            <div>{product.description}</div>
                        </div>
                        <div>
                            <p className='text-2xl font-bold'>
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <Button onClick={() => addToCart(product)}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {cart.length > 0 && (
                <div className='bg-muted p-6 rounded-lg mb-8'>
                    <h2 className='text-xl font-bold mb-4'>Your Cart</h2>
                    <div className='space-y-2 mb-4'>
                        {cart.map((item) => (
                            <div key={item.id} className='flex justify-between'>
                                <span>
                                    {item.name} x {item.quantity}
                                </span>
                                <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                        <div className='border-t pt-2 mt-2 font-bold flex justify-between'>
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <Button
                        className='w-full'
                        onClick={handleCheckout}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Checkout'}
                    </Button>
                </div>
            )}
        </main>
    );
}
