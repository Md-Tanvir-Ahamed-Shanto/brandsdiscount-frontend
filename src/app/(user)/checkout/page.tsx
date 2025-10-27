'use client';
import { useEffect, useState } from 'react';
import { createCheckoutSession } from './actions';
import { jwtDecode } from 'jwt-decode';
import type { MyTokenPayload } from '@/app/(profile)/profile/page';
import { useGetSingleProfileQuery } from '@/api';
import Cookies from 'js-cookie';

import { OrderItems, OrderSummary, ShippingInformation } from './components';
import { useAppSelector } from '@/store';

export default function Checkout() {
    const [isLoading, setIsLoading] = useState(false);
    const cart = useAppSelector((state) => state.cart.products.map(product => {
        const variant = product.variants?.find(v => 
            v.color === product.color && 
            (v.sizeType === product.sizeType || v.customSize === product.sizeType)
        );
        
        return {
            ...product,
            regularPrice: variant?.regularPrice || product.regularPrice,
            salePrice: variant?.salePrice || product.salePrice,
            stockQuantity: variant?.quantity || product.stockQuantity
        };
    }));

    const [userId, setUserId] = useState<string | null>(null);
    // Only fetch user data if userId is not null
    const { data: userData } = useGetSingleProfileQuery(userId, {
        skip: !userId // Skip the query if userId is null
    });
    const userDetails = userData?.userDetails;

    const finalAmount = useAppSelector((state) => state.order.finalAmount);
    
    // Calculate total from cart if finalAmount is 0
    const calculatedTotal = cart.reduce((total, item) => {
        const price = item.salePrice || item.regularPrice || 0;
        return total + (price * (item.quantity || 1));
    }, 0);

    const usedRedeemPoint = useAppSelector((state) => state.cart.appliedPoints);
    console.log('usedRedeemPoint we see from parent page', usedRedeemPoint); // 2000

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            // Use calculated total if finalAmount is 0
            const effectiveAmount = finalAmount > 0 ? finalAmount : calculatedTotal;
            
            // Don't proceed if we still have no valid amount
            if (effectiveAmount <= 0 && cart.length > 0) {
                throw new Error("Unable to determine order amount. Please try again or contact support.");
            }
            
            // Prepare checkout data with proper Address format
            const checkoutData = {
                cartItems: cart,
                userId: userId,
                appliedPoints: usedRedeemPoint,
                shippingAddress: userDetails?.address ? {
                    fullName: `${userDetails.firstName || ''} ${userDetails.lastName || ''}`.trim(),
                    addressLine1: userDetails.address,
                    city: userDetails.city || '',
                    state: userDetails.state || '',
                    postalCode: userDetails.zipCode || '',
                    country: userDetails.country || 'US'
                } : null,
                billingAddress: userDetails?.address ? {
                    fullName: `${userDetails.firstName || ''} ${userDetails.lastName || ''}`.trim(),
                    addressLine1: userDetails.address,
                    city: userDetails.city || '',
                    state: userDetails.state || '',
                    postalCode: userDetails.zipCode || '',
                    country: userDetails.country || 'US'
                } : null,
                finalAmount: effectiveAmount,
                customerEmail: userDetails?.email || 'customer@brandsdiscounts.com',
                ui_mode: 'hosted'
            };

            // Call the updated createCheckoutSession function
            const result = await createCheckoutSession(checkoutData);
            
            // If we're in embedded mode and get a result back instead of redirect
            if (result && result.sessionId) {
                window.location.href = `/checkout/success?session_id=${result.sessionId}`;
            }
            // Otherwise, the function will redirect automatically for hosted mode
        } catch (error) {
            console.error('Checkout error:', error);
            // Show error to user with toast or alert
            const errorMessage = error instanceof Error ? error.message : 'Payment processing failed. Please try again or contact support.';
            alert(errorMessage);
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
