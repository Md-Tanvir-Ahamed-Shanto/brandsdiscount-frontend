'use client';

import React from 'react';

const ProductSkeleton = () => {
    const skeletonCount = 12; 
    return (
        <div className='w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12'>
                {Array.from({ length: skeletonCount }).map((_, idx) => (
                    <div 
                        className='group relative animate-pulse transition-all duration-300' 
                        key={idx}
                        style={{ animationDelay: `${idx * 50}ms` }} // Staggered animation
                    >
                        {/* Discount Badge Skeleton */}
                        <div className='absolute left-0 top-4 z-10 bg-red-200 dark:bg-red-900/50 px-2 py-1 w-12 h-4 rounded'></div>

                        {/* Limited Time Badge Skeleton */}
                        <div className='absolute left-0 bottom-[40%] z-10 bg-amber-200 dark:bg-amber-900/50 px-2 py-1 w-28 h-4 rounded'></div>

                        {/* Image Skeleton with shimmer effect */}
                        <div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 block mb-4 shimmer'></div>

                        {/* Product Details Skeleton */}
                        <div className='mt-4 space-y-3'>
                            <div className='w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer'></div>
                            <div className='w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded shimmer'></div>

                            <div className='space-y-2 pt-1'>
                                <div className='w-2/3 h-3 bg-green-200 dark:bg-green-900/50 rounded shimmer'></div>
                                <div className='w-1/2 h-3 bg-gray-300 dark:bg-gray-700 rounded shimmer'></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add shimmer effect styles */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
                .shimmer {
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.2) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }
                
                /* Dark mode shimmer */
                :global(.dark) .shimmer {
                    background: linear-gradient(
                        90deg,
                        rgba(30, 30, 30, 0) 0%,
                        rgba(60, 60, 60, 0.2) 50%,
                        rgba(30, 30, 30, 0) 100%
                    );
                    background-size: 200% 100%;
                }
            `}</style>
        </div>
    );
};

export default ProductSkeleton;
