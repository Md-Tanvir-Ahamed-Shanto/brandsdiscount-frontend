'use client';
import { useGetNewTrendingProductsQuery } from '@/api/public';
import { ProductCard } from '@/app/components';
import { Icons } from '@/components';
import { trendingSliderSettings } from '@/config';
import { ISingleProduct } from '@/types';
import React from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const TrendingSlider = () => {
    const {
        data: trendingData = [],
        isLoading,
        isError,
        error
    } = useGetNewTrendingProductsQuery('');

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
    if (isLoading) return 'loading';
    if (isError || error) return 'something went wrong';
    return (
        <div className='relative trendingSlider max-h-[660px] sm:max-h-[470px] md:max-h-[600px] lg:max-h-[550px]'>
            <Slider
                ref={sliderRef}
                {...trendingSliderSettings}
                className='-ml-2'
            >
                {(trendingData?.data || [])
                    ?.slice(0, 8)
                    .map((product: ISingleProduct) => (
                        <ProductCard key={product?.id} product={product} />
                    ))}
            </Slider>

            <div
                className='flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full cursor-pointer absolute left-2 top-40'
                onClick={prevSlide}
            >
                <Icons.ChevronRight className='rotate-180 text-white' />
            </div>
            <div
                className='flex items-center justify-center w-10 h-10 bg-black/40 backdrop-blur-md rounded-full cursor-pointer absolute right-2 top-40'
                onClick={nextSlide}
            >
                <Icons.ChevronRight className='text-white' />
            </div>
        </div>
    );
};

export default TrendingSlider;
