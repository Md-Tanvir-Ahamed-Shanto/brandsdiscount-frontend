'use client';
import { useEffect, useState } from 'react';
import { getStripe } from '@/lib/stripe';
import { createCheckoutSession } from './actions';
import { jwtDecode } from 'jwt-decode';
import type { MyTokenPayload } from '@/app/(profile)/profile/page';
import { useGetSingleProfileQuery } from '@/api';
import Cookies from 'js-cookie';

import { OrderItems, OrderSummary, ShippingInformation } from './components';
import { useAppSelector } from '@/store';

export default function Checkout() {
    const [isLoading, setIsLoading] = useState(false);
    const cart = useAppSelector((state) => state.cart.products);

    const [userId, setUserId] = useState<string | null>(null);
    const { data: userData } = useGetSingleProfileQuery(userId);
    const userDetails = userData?.userDetails;

    const finalAmount = useAppSelector((state) => state.order.finalAmount);

    const usedRedeemPoint = useAppSelector((state) => state.cart.appliedPoints);
    console.log('usedRedeemPoint we see from parent page', usedRedeemPoint); // 2000

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const { sessionId } = await createCheckoutSession(finalAmount);
            const stripe = await getStripe();
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode<MyTokenPayload>(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return (
        <div className='container mx-auto py-10 px-4 md:px-6'>
            <h1 className='text-3xl font-bold mb-8'>
                Please Review And Confirm
            </h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Left Column - User Details */}
                <div className='lg:col-span-2 space-y-6'>
                    <ShippingInformation userDetails={userDetails} />
                    <OrderItems cart={cart} />
                </div>

                {/* Right Column - Order Summary */}
                <div>
                    <OrderSummary
                        isLoading={isLoading}
                        handleCheckout={handleCheckout}
                        userDetails={userDetails}
                    />
                </div>
            </div>
        </div>
    );
}
