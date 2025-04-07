/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { selectCartSubtotal, useAppSelector } from '@/store';

const OrderSummary = ({ isLoading, handleCheckout, userDetails }: any) => {
    const subtotal = useAppSelector(selectCartSubtotal);
    const cart = useAppSelector((state) => state.cart.products);
    return (
        <Card className='sticky top-6'>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Shipping</span>
                        <span>Calculated at next step</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Tax</span>
                        <span>Calculated at next step</span>
                    </div>
                    <Separator />
                    <div className='flex justify-between font-medium text-lg'>
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleCheckout}
                    disabled={isLoading || !userDetails || cart.length === 0}
                    className='w-full'
                    size='lg'
                >
                    {isLoading ? 'Processing...' : 'Proceed to Payment'}
                </Button>

                {!userDetails && cart.length > 0 && (
                    <p className='text-xs text-muted-foreground mt-2 text-center'>
                        Please update your profile to continue
                    </p>
                )}

                {cart.length === 0 && (
                    <p className='text-xs text-muted-foreground mt-2 text-center'>
                        Add products to your cart to continue
                    </p>
                )}
            </CardFooter>
        </Card>
    );
};

export default OrderSummary;
