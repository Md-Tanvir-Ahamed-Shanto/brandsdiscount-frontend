'use client';
import React, { useRef } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';
import { Icons } from '@/components';

const ProductImage = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);

    const handleZoom = () => {
        if (imageRef.current) {
            imageRef.current.click(); // Simulates a click to trigger zoom
        }
    };

    return (
        <div className='flex flex-col items-center gap-4 relative rounded'>
            <Zoom>
                <Image
                    width={132}
                    height={100}
                    alt={'title'}
                    unoptimized
                    ref={imageRef}
                    className='w-full h-auto cursor-pointer object-fill rounded'
                    src='/single-product/single.webp'
                />
            </Zoom>
            <button
                onClick={handleZoom}
                className='px-4 py-2 bg-black/40 backdrop-blur-md text-white rounded-md absolute bottom-4 left-4'
            >
                <Icons.Maximize2 />
            </button>
        </div>
    );
};

export default ProductImage;
