'use client';
import { useGetAllCategoryApiQuery } from '@/api/public';
import { LoadingSpinner } from '@/components';
import { categorySliderSettings } from '@/config';
// import { categorySliderSettings } from '@/config';
import Link from 'next/link';
import React from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CategorySlider = () => {
    const { data: categoryData = [], isLoading } =
        useGetAllCategoryApiQuery('');
    const sliderRef = useRef<Slider | null>(null); // type: Slider | null

    /*   const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    }; */

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='categorySlider overflow-hidden relative mb-6'>
            <Slider
                ref={sliderRef}
                {...categorySliderSettings}
                className='-ml-2'
            >
                {(categoryData ?? [])?.data?.map(
                    ({ id, name }: { id: string; name: string }) => (
                        <Link
                            href={`/shop?q=${name}`}
                            key={id}
                            className='relative hover:text-black group gap-2
             hover:bg-main-500/60 py-2.5 px-4 rounded bg-main-500 text-black text-center'
                        >
                            {name}
                        </Link>
                    )
                )}
            </Slider>

            {/* <div
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
            </div> */}
        </div>
    );
};

export default CategorySlider;
