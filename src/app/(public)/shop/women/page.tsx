import Avatar from '@/components/Avatar';
import { WOMEN_COLLECTIONS } from '@/static/home/women-collection';
import Link from 'next/link';
import React from 'react';

const WomenCollection = () => {
    return (
        <div className='py-16'>
            <div className='container'>
                <h3 className='font-bold text-2xl lg:text-4xl mb-12 text-center'>
                    Women's Collection
                </h3>

                <div className='space-y-16'>
                    {WOMEN_COLLECTIONS.map((collection) => (
                        <div key={collection.id} className='space-y-8'>
                            <h4 className='text-2xl font-semibold'>
                                {collection.title}
                            </h4>

                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                                {collection.categories.map((category) => (
                                    <Link
                                        href={`/shop?filter=categoryId_${category.id}`}
                                        className='block group'
                                        key={category.id}
                                    >
                                        <div className='relative bg-gradient-to-r from-[#b5b5b3] to-[#cccacc]'>
                                            <div className='relative overflow-hidden'>
                                                <Avatar
                                                    src={category.image}
                                                    className='w-full aspect-square object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                                                    priority={true}
                                                />
                                                <div className='absolute inset-0 bg-black/20'></div>
                                            </div>
                                        </div>
                                        <h4 className='text-center mt-4 font-medium'>
                                            {category.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WomenCollection;
