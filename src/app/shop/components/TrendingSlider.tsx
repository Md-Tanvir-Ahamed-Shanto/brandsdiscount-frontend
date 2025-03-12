'use client';
import { ProductCard } from '@/app/components';
import { Icons } from '@/components';
import { trendingSliderSettings } from '@/config';
import { TRENDING_SHOP } from '@/static';
import React from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const TrendingSlider = () => {
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
        <div className='overflow-hidden relative trendingSlider'>
            <Slider
                ref={sliderRef}
                {...trendingSliderSettings}
                className='-ml-2'
            >
                {TRENDING_SHOP.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </Slider>

            <div
                className='flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full cursor-pointer absolute left-2 top-48'
                onClick={prevSlide}
            >
                <Icons.ChevronRight className='rotate-180 text-white' />
            </div>
            <div
                className='flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full cursor-pointer absolute right-2 top-48'
                onClick={nextSlide}
            >
                <Icons.ChevronRight className='text-white' />
            </div>
        </div>
    );
};

export default TrendingSlider;
