import React from 'react';
import { CategorySlider, ProductCard } from '../components';
import {
    FilterSheet,
    Pagination,
    SortDropdown,
    TrendingSlider
} from './components';
import { PRODUCTS } from '@/static';

const page = () => {
    return (
        <div className='container py-6 !overflow-hidden'>
            <h3 className='font-bold text-2xl mb-4'>Girls Cloths (740)</h3>
            <CategorySlider />
            <div className='flex items-center justify-between'>
                <FilterSheet />
                <SortDropdown />
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12'>
                {PRODUCTS.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>

            <div className='mb-12'>
                <Pagination />
            </div>

            <h3 className='font-bold text-2xl mb-8'>Trending Near You</h3>
            <div className='mb-12'>
                <TrendingSlider />
            </div>
        </div>
    );
};

export default page;
