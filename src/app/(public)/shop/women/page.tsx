import Avatar from '@/components/Avatar';
import { WOMEN_COLLECTIONS } from '@/static/home/women-collection';
import Link from 'next/link';
import React from 'react';
import { WomenProducts } from './components/WomenProducts';

const WomenCollection = () => {
    const allCategories = WOMEN_COLLECTIONS.flatMap(
        (collection) => collection.categories
    );

    return (
        <div className='py-8'>
            <div className='container max-w-7xl mx-auto px-4'>
                <h3 className='font-bold text-xl lg:text-2xl mb-8 text-center'>
                    Women&apos;s Collection
                </h3>

                <div className='flex justify-center'>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 max-w-[1400px]'>
                        {allCategories?.map((category) => (
                            <Link
                                href={`/shop?filter=categoryId_${category.id}`}
                                className='block group'
                                key={category.id}
                            >
                                <div className='relative bg-gradient-to-r from-[#b5b5b3] to-[#cccacc] aspect-square mx-auto'>
                                    <div className='relative overflow-hidden w-full h-full'>
                                        <Avatar
                                            src={category.image}
                                            className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                                            priority={true}
                                        />
                                        <div className='absolute inset-0 bg-black/20'></div>
                                    </div>
                                </div>
                                <h4 className='text-center mt-1'>
                                    {category.title}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <WomenProducts />
            </div>
        </div>
    );
};

export default WomenCollection;
