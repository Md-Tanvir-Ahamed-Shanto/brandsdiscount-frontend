/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { ShoppingBag, Plus, ArrowRight, Edit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const OrderItems = ({ cart }: any) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center'>
                    <ShoppingBag className='mr-2 h-5 w-5' />
                    Order Items
                </CardTitle>
                <CardDescription>
                    Review your items before checkout
                </CardDescription>
            </CardHeader>
            <CardContent>
                {cart.length === 0 ? (
                    <div>
                        Your cart is empty. Add some products to proceed with
                        checkout.
                        <Link
                            href='/shop'
                            className='block mt-2 font-medium underline'
                        >
                            Browse Products{' '}
                            <ArrowRight className='h-4 w-4 inline ml-1' />
                        </Link>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {cart.map((product: any) => (
                            <div key={product.id} className='flex gap-4 py-3'>
                                <div className='flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden'>
                                    <Image
                                        src={
                                            product?.images[0] ||
                                            '/single-product/single.webp'
                                        }
                                        alt={product?.title}
                                        width={120}
                                        height={150}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-medium'>
                                        {product.title}
                                    </h3>
                                    <div className='text-sm text-muted-foreground mt-1'>
                                        ${product.salePrice.toFixed(2)} ×{' '}
                                        {product.quantity}
                                    </div>
                                    <div className='mt-2 font-medium'>
                                        $
                                        {(
                                            product.salePrice * product.quantity
                                        ).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='pt-2'>
                            <div className='flex justify-between text-sm'>
                                <Link
                                    href='/shop'
                                    className='text-primary hover:underline flex items-center'
                                >
                                    <Plus className='h-4 w-4 mr-1' />
                                    Add more products
                                </Link>
                                <Link
                                    href='/cart'
                                    className='text-primary hover:underline flex items-center'
                                >
                                    <Edit className='h-4 w-4 mr-1' />
                                    Edit quantities
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default OrderItems;
