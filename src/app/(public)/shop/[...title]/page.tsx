'use client';

import React from 'react';
import {
    AdditionalInformation,
    ProductDetails,
    ProductImage
} from './components';
import { TrendingSlider } from '../components';
import { useParams } from 'next/navigation';
import { convertFromUrl } from '@/lib';
import { PRODUCTS } from '@/static';

const SingleProductPage = () => {
    const params = useParams();
    const slug = params?.title as string;

    const productName = convertFromUrl(slug[0]);

    // Find product by name
    const product = PRODUCTS?.find(
        (p) => p.name.toLowerCase() === productName?.toLowerCase()
    );

    if (!product) {
        return <h1>Product not found</h1>;
    }
    return (
        <div className='container py-12'>
            <div className='grid grid-cols-12'>
                <div className='col-span-12 lg:col-span-6 lg:ml-5'>
                    <ProductImage image={product?.image} />
                </div>
                <div className='col-span-12 lg:col-span-1'></div>
                <div className='col-span-12 lg:col-span-5'>
                    <ProductDetails product={product} />
                </div>
            </div>

            <div className='py-12'>
                <AdditionalInformation />
            </div>

            <h3 className='font-bold text-2xl mb-8'>Trending Near You</h3>
            <div className='mb-12'>
                <TrendingSlider />
            </div>
        </div>
    );
};

export default SingleProductPage;
