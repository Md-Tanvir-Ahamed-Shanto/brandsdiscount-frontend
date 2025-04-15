import Avatar from '@/components/Avatar';
import { FEATURED } from '@/static';
import Link from 'next/link';
import React from 'react';

const Featured = () => {
    return (
        <div className='py-16'>
            <div className='container'>
                <h3 className='font-bold text-2xl lg:text-4xl mb-12 text-center'>
                    Featured Categories
                </h3>

                <div className='grid grid-cols-12 gap-6'>
                    {FEATURED?.map(({ id, title, url, image }) => (
                        <Link
                            href={url}
                            className='col-span-12 sm:col-span-6 lg:col-span-3 block group'
                            key={id}
                        >
                            <div className='relative p-[2px] rounded-[12px] bg-gradient-to-r from-[#b5b5b3] to-[#cccacc]'>
                                {/* Image Wrapper with Overlay & Scale Effect */}
                                <div className='relative overflow-hidden rounded-[10px]'>
                                    <Avatar
                                        src={image}
                                        className='w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-[10px]'
                                        priority={true}
                                    />
                                    {/* Overlay */}
                                    <div className='absolute inset-0 bg-black/20 rounded-[10px]'></div>
                                </div>
                            </div>
                            <h4 className='text-center mt-2'>{title}</h4>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Featured;
