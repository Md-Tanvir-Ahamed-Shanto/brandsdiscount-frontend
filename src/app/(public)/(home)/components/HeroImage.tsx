import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroImage = () => {
    return (
        <div className='md:container mb-8'>
            {/* Desktop Image */}
            <Link href='/shop' className='hidden md:block'>
                <Image
                    src='/hero/bannar_full.png'
                    alt='Hero Banner Full'
                    className='w-full h-full object-cover'
                    width={1920}
                    height={600}
                    priority
                />
            </Link>

            {/* Mobile Image */}
            <Link href='/shop' className='block md:hidden'>
                <Image
                    src='/hero/bannar_mobile.png'
                    alt='Hero Banner Mobile'
                    className='w-full h-full object-cover'
                    width={768}
                    height={500}
                    priority
                />
            </Link>
        </div>
    );
};

export default HeroImage;
