import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='animate-pulse group relative'>
                {/* Image Skeleton */}
                <div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200 block mb-4 h-[275px] w-full'></div>

                {/* Discount Badge */}
                <div className='absolute left-0 top-4 z-10 bg-red-300 px-2 py-1 w-20 h-5 rounded'></div>

                {/* Limited Time Badge */}
                <div className='absolute left-0 top-48 z-10 bg-amber-300 px-2 py-1 w-28 h-5 rounded'></div>

                {/* Product Details */}
                <div className='mt-4 space-y-2'>
                    <div className='w-1/2 h-3 bg-gray-200 rounded'></div>
                    <div className='w-3/4 h-4 bg-gray-300 rounded'></div>

                    <div className='space-y-1'>
                        <div className='w-2/3 h-3 bg-green-200 rounded'></div>
                        <div className='w-1/2 h-3 bg-gray-300 rounded'></div>
                    </div>
                </div>
            </div>
            <div className='animate-pulse group relative'>
                {/* Image Skeleton */}
                <div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200 block mb-4 h-[275px] w-full'></div>

                {/* Discount Badge */}
                <div className='absolute left-0 top-4 z-10 bg-red-300 px-2 py-1 w-20 h-5 rounded'></div>

                {/* Limited Time Badge */}
                <div className='absolute left-0 top-48 z-10 bg-amber-300 px-2 py-1 w-28 h-5 rounded'></div>

                {/* Product Details */}
                <div className='mt-4 space-y-2'>
                    <div className='w-1/2 h-3 bg-gray-200 rounded'></div>
                    <div className='w-3/4 h-4 bg-gray-300 rounded'></div>

                    <div className='space-y-1'>
                        <div className='w-2/3 h-3 bg-green-200 rounded'></div>
                        <div className='w-1/2 h-3 bg-gray-300 rounded'></div>
                    </div>
                </div>
            </div>
            <div className='animate-pulse group relative'>
                {/* Image Skeleton */}
                <div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200 block mb-4 h-[275px] w-full'></div>

                {/* Discount Badge */}
                <div className='absolute left-0 top-4 z-10 bg-red-300 px-2 py-1 w-20 h-5 rounded'></div>

                {/* Limited Time Badge */}
                <div className='absolute left-0 top-48 z-10 bg-amber-300 px-2 py-1 w-28 h-5 rounded'></div>

                {/* Product Details */}
                <div className='mt-4 space-y-2'>
                    <div className='w-1/2 h-3 bg-gray-200 rounded'></div>
                    <div className='w-3/4 h-4 bg-gray-300 rounded'></div>

                    <div className='space-y-1'>
                        <div className='w-2/3 h-3 bg-green-200 rounded'></div>
                        <div className='w-1/2 h-3 bg-gray-300 rounded'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
