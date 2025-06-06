'use client';
import { MENU } from '@/static';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// Slider settings
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: true, // Enable drag with mouse
    swipe: true, // Enable swipe gesture
    touchMove: true, // Allow movement on touch devices
    responsive: [
        {
            breakpoint: 1360,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2
            }
        }
    ]
};

const CategorySlider = () => {
    return (
        <div className='items-center justify-center hidden lg:flex'>
            <div className='w-5/6 xl:w-4/6 px-4'>
                <Slider {...settings}>
                    {(MENU ?? []).map(({ label, link, id }) => (
                        <div key={id} className='px-2'>
                            <Link
                                href={link}
                                className='block text-center py-3 px-6 text-black rounded hover:bg-main-500/60 hover:text-black transition-all duration-300'
                            >
                                {label}
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CategorySlider;
