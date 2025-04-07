/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
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
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        if (sessionId && !localStorage.getItem(`order_created_${sessionId}`)) {
            const checkStatus = async () => {
                try {
                    const { status, session } =
                        await getSessionStatus(sessionId);
                    setStatus(status);

                    const orderDetails = cart?.map((item: any) => {
                        console.log(item?.category);
                        return {
                            productId: item?.id,
                            quantity: item?.quantity,
                            price: item?.salePrice,
                            total: item?.salePrice * item?.quantity,
                            productName: item?.title,
                            categoryName: item?.category?.name || 'undefined',
                            sizeName: item?.size?.name || 'undefined'
                        };
                    });

                    const payload = {
                        totalAmount: Number(session?.amount_total) / 100,
                        sku: session?.id,
                        status: 'Pending',
                        transactionId: session?.payment_intent,
                        claimLoyaltyOffer: false,
                        redeemPoint: 0,
                        orderDetails // ← your dynamic cart data goes here
                    };

                    const response = await createOrder(payload).unwrap();
                    console.log('🚀 ~ checkStatus ~ payload:', response);

                    if (response) {
                        toast.success('Order created successfully');
                        dispatch(clearCart());
                        localStorage.setItem(
                            `order_created_${sessionId}`,
                            'true'
                        );
                        router.push('/');
                    }
                } catch (error) {
                    console.error('Error checking payment status:', error);
                } finally {
                    setLoading(false);
                }
            };

            checkStatus();
        } else {
            setLoading(false);
        }
    }, [sessionId, cart, createOrder, dispatch, router]);

    if (loading || isLoading) {
        return (
            <div className='container mx-auto py-20 px-4 text-center'>
                <p className='text-xl'>
                    Checking payment status... Wait... Don;t reload page
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
