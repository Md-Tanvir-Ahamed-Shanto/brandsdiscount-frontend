'use client';
import { useEffect, useState } from 'react';
import { createCheckoutSession } from './actions';
import { jwtDecode } from 'jwt-decode';
import type { MyTokenPayload } from '@/app/(profile)/profile/page';
import { useGetSingleProfileQuery } from '@/api';
import Cookies from 'js-cookie';
import { AlertCircle } from 'lucide-react';

import { OrderItems, OrderSummary, ShippingInformation } from './components';
import { useAppSelector } from '@/store';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CheckoutError from './error';

interface CheckoutError extends Error {
    code?: string;
}

export default function Checkout() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
        if (isLoading) return; // Prevent double-clicks
        
        setIsLoading(true);
        setError(null);

        try {
            // Validate cart before proceeding
            if (!cart || cart.length === 0) {
                const err = new Error('Your cart is empty. Please add items before checkout.') as CheckoutError;
                err.code = 'EMPTY_CART';
                throw err;
            }

            // Validate effective amount
            const effectiveAmount = finalAmount > 0 ? finalAmount : calculatedTotal;
            if (effectiveAmount <= 0) {
                const err = new Error('Invalid order amount. Please refresh and try again.') as CheckoutError;
                err.code = 'INVALID_AMOUNT';
                throw err;
            }

            // Validate user data if available
            if (userData && (!userData.email || !userDetails)) {
                const err = new Error('User information is incomplete. Please update your profile.') as CheckoutError;
                err.code = 'INCOMPLETE_PROFILE';
                throw err;
            }

            const checkoutData = {
                cartItems: cart,
                userId: userId,
                appliedPoints: usedRedeemPoint,
                shippingAddress: userDetails ? {
                    fullName: `${userDetails.firstName || ''} ${userDetails.lastName || ''}`.trim(),
                    addressLine1: userDetails.address || '',
                    addressLine2: userDetails.address2 || '',
                    city: userDetails.city || '',
                    state: userDetails.state || '',
                    postalCode: userDetails.zipCode || '',
                    country: userDetails.country || 'US'
                } : null,
                finalAmount: effectiveAmount,
                customerEmail: userData?.email, // Pass the actual user email
                ui_mode: 'hosted'
            };

            // Call the updated createCheckoutSession function with timeout
            const result = await Promise.race([
                createCheckoutSession(checkoutData),
                new Promise((_, reject) => 
                    setTimeout(() => {
                        const err = new Error('Request timed out. Please try again.') as CheckoutError;
                        err.code = 'TIMEOUT';
                        reject(err);
                    }, 30000)
                )
            ]);
            
            // Handle fallback redirect if server action redirect failed
            if (result && typeof result === 'object' && 'fallback' in result && result.fallback) {
                console.log('Using fallback redirect to:', (result as unknown as { url: string }).url);
                window.location.href = (result as unknown as { url: string }).url;
                return;
            }
            
            // If we're in embedded mode and get a result back instead of redirect
            if (result && typeof result === 'object' && 'sessionId' in result) {
                window.location.href = `/success?session_id=${result.sessionId}`;
                return;
            }
            
            // Otherwise, the function will redirect automatically for hosted mode
        } catch (error) {
            console.error('Checkout error:', error);
            const checkoutError = error as CheckoutError;
            let errorMessage = 'Payment processing failed. Please try again or contact support.';
            
            // Handle specific error types
            if (checkoutError.code === 'NETWORK_ERROR' || checkoutError.code === 'TIMEOUT') {
                errorMessage = 'Network connection failed. Please check your internet connection and try again.';
            } else if (checkoutError.code === 'VALIDATION_ERROR' || checkoutError.code === 'EMPTY_CART') {
                errorMessage = 'Please check your cart and shipping information and try again.';
            } else if (checkoutError.code === 'INCOMPLETE_PROFILE') {
                errorMessage = 'Please complete your profile information before checkout.';
            } else if (checkoutError.code === 'REDIRECT_ERROR') {
                errorMessage = 'Redirect failed. Please try again or contact support.';
            } else if (checkoutError.message) {
                errorMessage = checkoutError.message;
            }
            
            setError(errorMessage);
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
            
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
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
