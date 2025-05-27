'use client';
import { ProductCard } from '@/app/components';
import { ISingleProduct } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const RecentlyViewedSlider = () => {
    const [recentProducts, setRecentProducts] = useState<ISingleProduct[]>([]);
    const sliderRef = useRef<Slider | null>(null);

    useEffect(() => {
        const storedProducts = localStorage.getItem('recentlyViewed');
        if (storedProducts) {
            setRecentProducts(JSON.parse(storedProducts));
        }
    }, []);

    if (recentProducts.length === 0) return null;

    const settings = {
        className: 'slick-container',
        centerMode: false,
        infinite: recentProducts.length > 5,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: '0',
        dots: false,
        arrows: false,
        draggable: true,
        swipe: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: recentProducts.length > 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: recentProducts.length > 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: recentProducts.length > 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: recentProducts.length > 1
                }
            }
        ]
    };

    return (
        <div className='container'>
            <h3 className='font-bold text-2xl mb-8'>Recently Viewed</h3>
            <div className='mb-12'>
                <div>
                    <Slider ref={sliderRef} {...settings}>
                        {recentProducts.map((product: ISingleProduct) => (
                            <div key={product?.id} className='px-2 w-full'>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default RecentlyViewedSlider;
