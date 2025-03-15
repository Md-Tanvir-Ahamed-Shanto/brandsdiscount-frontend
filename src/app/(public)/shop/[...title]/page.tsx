import React from 'react';
import {
    AdditionalInformation,
    ProductDetails,
    ProductImage
} from './components';
import { TrendingSlider } from '../components';

const page = () => {
    return (
        <div className='container py-12'>
            <div className='grid grid-cols-12'>
                <div className='col-span-12 lg:col-span-6 lg:ml-5'>
                    <ProductImage />
                </div>
                <div className='col-span-12 lg:col-span-1'></div>
                <div className='col-span-12 lg:col-span-5'>
                    <ProductDetails />
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

export default page;
