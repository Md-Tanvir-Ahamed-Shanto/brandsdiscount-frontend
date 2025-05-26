'use client';
import { useGetNewTrendingProductsQuery } from '@/api/public';
import { ProductCard, ProductSkeleton } from '@/app/components';
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

    if (isLoading) return <ProductSkeleton />;
    if (isError || error) return 'something went wrong';
    return (
        <div className='  '>
            <Slider ref={sliderRef} {...trendingSliderSettings}>
                {(trendingData?.data || [])
                    ?.slice(0, 8)
                    .map((product: ISingleProduct) => (
                        <ProductCard key={product?.id} product={product} />
                    ))}
            </Slider>
        </div>
    );
};

export default TrendingSlider;
