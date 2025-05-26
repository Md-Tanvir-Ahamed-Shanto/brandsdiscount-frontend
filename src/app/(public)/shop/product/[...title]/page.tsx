'use client';
import React from 'react';
import {
    AdditionalInformation,
    ProductDetails,
    ProductImage
} from './components';
import { TrendingSlider } from '../../components';
import { useSearchParams } from 'next/navigation';
import { useGetSinglePublicProductQuery } from '@/api/public';
import { LoadingPublic } from '@/components';
// import { convertFromUrl } from '@/lib';
// import { PRODUCTS } from '@/static';

const SingleProductPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') as string; // ✅ Get ID from URL query
    console.log(id);

    const { data, isLoading, isError } = useGetSinglePublicProductQuery(id);

    console.log('🔍 Single Product Data:', data);

    if (isLoading) return <LoadingPublic />;
    if (isError || !data)
        return (
            <p className='text-center py-48 font-bold text-3xl'>
                Product not found.
            </p>
        );

    /* const product = PRODUCTS?.find(
        (p) => p.name.toLowerCase() === productName?.toLowerCase()
    );

    if (!product) {
        return <h1>Product not found</h1>;
    }   */
    return (
        <div className='container py-12'>
            <div className='grid grid-cols-12'>
                <div className='col-span-12 lg:col-span-6 lg:ml-5'>
                    <ProductImage image={data?.images} />
                </div>
                <div className='col-span-12 lg:col-span-1'></div>
                <div className='col-span-12 lg:col-span-5'>
                    <ProductDetails product={data} />
                </div>
            </div>

            <div className='py-12'>
                <AdditionalInformation product={data} />
            </div>

            <h3 className='font-bold text-2xl mb-8'>Trending Near You</h3>
            <div className='mb-12'>
                <TrendingSlider />
            </div>
        </div>
    );
};

export default SingleProductPage;
