const ProductSkeleton = () => {
    return (
        <div className='container'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12'>
                {Array.from({ length: 40 }).map((_, idx) => (
                    <div className='group relative animate-pulse' key={idx}>
                        {/* Discount Badge Skeleton */}
                        <div className='absolute left-0 top-4 z-10 bg-red-200 px-2 py-1 w-12 h-4 rounded'></div>

                        {/* Limited Time Badge Skeleton */}
                        <div className='absolute left-0 bottom-[40%] z-10 bg-amber-200 px-2 py-1 w-28 h-4 rounded'></div>

                        {/* Image Skeleton */}
                        <div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200 block mb-4'></div>

                        {/* Product Details Skeleton */}
                        <div className='mt-4 space-y-2'>
                            <div className='w-1/2 h-3 bg-gray-200 rounded'></div>
                            <div className='w-3/4 h-4 bg-gray-300 rounded'></div>

                            <div className='space-y-1'>
                                <div className='w-2/3 h-3 bg-green-200 rounded'></div>
                                <div className='w-1/2 h-3 bg-gray-300 rounded'></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSkeleton;
