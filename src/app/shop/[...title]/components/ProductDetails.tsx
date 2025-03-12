'use client';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { IProduct, RECOMMENDED_PRODUCTS } from '@/static';
import Link from 'next/link';

const ProductDetails = () => {
    return (
        <>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='mb-12'>
                    <h1 className='text-xl font-bold mb-2'>Epic Threads</h1>
                    <p className='text-lg mb-4'>
                        Girls Fairfield Wide Leg Jeans, Exclusively at Macys
                    </p>

                    <div className='flex items-baseline gap-2 mb-4'>
                        <span className='text-2xl font-bold'>BDT 5,535.86</span>
                        <button className='text-sm text-blue-600 underline'>
                            Details
                        </button>
                    </div>

                    <div className='mb-6'>
                        <p className='mb-2'>Color: Fairfield</p>
                    </div>

                    <div className='mb-8'>
                        <div className='flex items-center gap-2 mb-4'>
                            <span>Size: Please select</span>
                            <button className='text-sm text-blue-600 underline'>
                                Size Chart
                            </button>
                        </div>

                        <Link href='/checkout'>
                            <Button className='w-full bg-red-700 hover:bg-red-800 text-white py-6'>
                                Add To Bag
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <h2 className='text-2xl font-bold mb-6'>You may also like</h2>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    {RECOMMENDED_PRODUCTS.map((product: IProduct) => (
                        <div key={product.id} className='group cursor-pointer'>
                            <div className='relative aspect-[3/4] mb-4'>
                                <Avatar src={product.image} />
                            </div>
                            <div className='space-y-1'>
                                <h3 className='font-medium'>{product.brand}</h3>
                                <p className='text-sm text-gray-600 line-clamp-2'>
                                    {product.name}
                                </p>
                                <div className='space-y-1'>
                                    <p className='font-medium'>
                                        BDT {product.price.toFixed(2)}
                                    </p>
                                    <p className='text-red-600'>
                                        With offer BDT{' '}
                                        {product.offerPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
