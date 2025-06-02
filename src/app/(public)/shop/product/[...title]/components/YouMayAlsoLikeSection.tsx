/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import { IProduct } from '@/types/product';
import { useGetMayLikeProductsQuery } from '@/api/public';

const SkeletonCard = () => (
    <div className='animate-pulse space-y-2'>
        <div className='aspect-[3/4] bg-gray-200 rounded-md mb-2' />
        <div className='h-4 bg-gray-200 rounded w-3/4' />
        <div className='h-3 bg-gray-200 rounded w-1/2' />
        <div className='h-3 bg-gray-200 rounded w-2/3' />
    </div>
);

const YouMayAlsoLikeSection = ({ product }: any) => {
    const { data, isLoading, isError } = useGetMayLikeProductsQuery(
        product?.categoryId
    );
    console.log('🚀 ~ YouMayAlsoLikeSection ~ data:', data);

    if (isLoading) {
        return (
            <div className='mt-10'>
                <h2 className='text-2xl font-bold mb-6'>You may also like</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    {[...Array(4)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError || !data?.data?.length) {
        return null;
    }

    return (
        <div className='mt-10'>
            <h2 className='text-2xl font-bold mb-6'>You may also like</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                {data?.data?.slice(0, 4).map((product: IProduct) => (
                    <Link
                        href={`/shop/${product?.id}`}
                        key={product.id}
                        className='group cursor-pointer'
                    >
                        <div className='relative aspect-[3/4] mb-4 rounded overflow-hidden'>
                            <Avatar
                                src={
                                    product?.images?.[0]?.url ||
                                    '/shop/no-image.jpeg'
                                }
                                alt={product?.title}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='space-y-1'>
                            <h3 className='font-medium text-gray-800'>
                                {product?.brandName}
                            </h3>
                            <p className='text-sm text-gray-600 line-clamp-2'>
                                {product?.title}
                            </p>
                            <div className='space-y-1'>
                                <p className='font-medium text-green-700'>
                                    USD {product?.platFormPrice}
                                </p>
                                <p className='text-sm text-red-600'>
                                    With offer USD {product?.salePrice}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default YouMayAlsoLikeSection;
