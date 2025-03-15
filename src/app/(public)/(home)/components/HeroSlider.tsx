'use client';
import { Icons } from '@/components';
import Avatar from '@/components/Avatar';
import { heroSliderSettings } from '@/config';
import { HERO } from '@/static';
import Link from 'next/link';
import React from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const HeroSlider = () => {
    const sliderRef = useRef<Slider | null>(null);

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    return (
        <div className='container heroSlider mb-8'>
            <Slider ref={sliderRef} {...heroSliderSettings} className='-ml-2'>
                {HERO?.map(({ id, image, brand }) => (
                    <div key={id} className='relative max-h-[580px]'>
                    {/* Image */}
                    <Avatar
                        src={image}
                        className='w-full h-full object-cover'
                    />

                    {/* Dark Overlay - Updated to use inset-0 and h-full instead of fixed height */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 h-full lg:h-[115%]'></div>

                    {/* Content - Add your text and button here */}
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4'>
                        {/* Your text content */}
                        <h2 className='text-2xl lg:text-4xl font-bold mb-2 lg:mb-4'>
                        {brand}
                        </h2>
                        <p className='text-lg lg:text-xl mb-4 lg:mb-8'>
                        Discover the latest arrivals
                        </p>

                        {/* Button */}
                        <Link
                        href='/shop'
                        className='bg-white text-black px-4 lg:px-8 py-1.5 lg:py-3 rounded-full hover:bg-gray-100 transition'
                        >
                        Shop Now
                        </Link>
                    </div>
                    </div>
                ))}
            </Slider>

            <div
                className='flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full cursor-pointer absolute left-2 top-[50%] xs:top-[55%] sm:top-[60%] md:top-[65%]'
                onClick={prevSlide}
            >
                <Icons.ChevronRight className='rotate-180 text-white' />
            </div>
            <div
                className='flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full cursor-pointer absolute right-2 top-[50%] xs:top-[55%] sm:top-[60%] md:top-[65%]'
                onClick={nextSlide}
            >
                <Icons.ChevronRight className='text-white' />
            </div>
        </div>
    );
};

export default HeroSlider;
