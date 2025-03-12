'use client';
import { Icons } from '@/components';
import Avatar from '@/components/Avatar';
import { categorySliderSettings } from '@/config';
// import { categorySliderSettings } from '@/config';
import { CATEGORY_ITEMS } from '@/static';
import Link from 'next/link';
import React from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CategorySlider = () => {
    const sliderRef = useRef<Slider | null>(null); // type: Slider | null

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
        <div className='categorySlider overflow-hidden relative'>
            <Slider
                ref={sliderRef}
                {...categorySliderSettings}
                className='-ml-2'
            >
                {CATEGORY_ITEMS?.map(({ id, avatar, title, url }) => (
                    <Link
                        href={url}
                        key={id}
                        className='relative text-gray-800 hover:text-black group !flex items-center justify-between gap-2
                    bg-main-400 hover:bg-main-500 p-1 mx-2 rounded-[100] px-3'
                    >
                        <Avatar
                            src={avatar}
                            className='!max-h-12 w-auto rounded-md'
                        />
                        <span className='mr-2'>{title}</span>
                    </Link>
                ))}
            </Slider>

            <div
                className='flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full cursor-pointer absolute left-2 top-2'
                onClick={prevSlide}
            >
                <Icons.ChevronRight className='rotate-180 text-white' />
            </div>
            <div
                className='flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full cursor-pointer absolute right-2 top-2'
                onClick={nextSlide}
            >
                <Icons.ChevronRight className='text-white' />
            </div>
        </div>
    );
};

export default CategorySlider;
