/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { getSessionStatus } from '@/app/(user)/checkout/actions';
import { clearCart, useAppDispatch, useAppSelector } from '@/store';
import { useCreateOrderMutation } from '@/api';
import toast from 'react-hot-toast';

const SuccessPageContent = () => {
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const cart = useAppSelector((state) => state.cart.products as any);
    const usedRedeemPoint = useAppSelector((state) => state.cart.appliedPoints);
    console.log('usedRedeemPoint we see from successPage', usedRedeemPoint); // 0
console.log("cart products", cart)
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Use a ref to track if order creation has been attempted
    const orderCreationAttempted = useRef(false);

    useEffect(() => {
        // Only proceed if sessionId exists and order creation hasn't been attempted yet
        if (sessionId && !orderCreationAttempted.current) {
            // Mark that we've attempted order creation to prevent duplicates
            orderCreationAttempted.current = true;

            const checkStatus = async () => {
                try {
                    const { status: paymentStatus, session } =
                        await getSessionStatus(sessionId);
                    setStatus(paymentStatus);
// console.log("session", session)
                    // Only proceed with order creation if payment was successful
                    if (paymentStatus === 'paid') {
                        const orderDetails = cart?.map((item: any) => {
                            return {
                                productId: item?.id,
                                quantity: item?.quantity,
                                price: item?.salePrice,
                                total: item?.salePrice * item?.quantity,
                                productName: item?.title,
                                sku: item?.sku || 'undefined',
                                categoryName:
                                    item?.category?.name || 'undefined',
                                sizeName: item?.size?.name || 'undefined'
                            };
                        });

                        const payload = {
                            totalAmount: Number(session?.amount_total) / 100,
                            sku: session?.id,
                            status: 'Pending',
                            transactionId: session?.payment_intent || session?.id,
                            claimLoyaltyOffer: false,
                            redeemPoint: usedRedeemPoint ? usedRedeemPoint : 0,
                            orderDetails
                        };

                        // Create the order
                        const response = await createOrder(payload).unwrap();

                        if (response) {
                            dispatch(clearCart());
                            toast.success('Order created successfully');
                            // Delay the navigation slightly to ensure toast is visible
                            setTimeout(() => {
                                router.push('/');
                            }, 1000);
                        }
                    }

                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error('Error checking payment status:', error);
                    toast.error('Error processing your order');
                }
            };

            checkStatus();
        }
    }, [sessionId, cart, createOrder, dispatch, router, usedRedeemPoint]);

    if (loading || isLoading) {
        return (
            <div className='container mx-auto py-20 px-4 text-center'>
                <p className='text-xl'>
                    Checking payment status... Please wait. Donot reload the
                    page.
                </p>
            </div>
        );
    }

    if (!sessionId || status !== 'paid') {
        return (
            <div className='container mx-auto py-20 px-4 text-center'>
                <h1 className='text-2xl font-bold mb-4'>
                    Something went wrong
                </h1>
                <p className='mb-8'>
                    There was an issue with your payment or you canceled the
                    checkout.
                </p>
                <Button asChild>
                    <Link href='/'>Return to Shop</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className='container mx-auto py-20 px-4 text-center'>
            <div className='flex justify-center mb-6'>
                <CheckCircle className='h-16 w-16 text-green-500' />
            </div>
            <h1 className='text-3xl font-bold mb-4'>Payment Successful!</h1>
            <p className='text-xl mb-8'>
                Thank you for your purchase. Your order has been processed
                successfully.
            </p>
            <Button asChild>
                <Link href='/'>Continue Shopping</Link>
            </Button>
        </div>
    );
};

export default SuccessPageContent;
