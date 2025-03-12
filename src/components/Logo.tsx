'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface IProps {
    className?: string;
}

const Logo: FC<IProps> = ({ className }) => {
    const { theme } = useTheme();

    return (
        <Link href='/' className='block'>
            <Image
                height={35}
                width={100}
                src={theme === 'dark' ? '/logo.png' : '/logo.png'}
                alt='site-logo'
                className={`${className} h-8 md:h-9 w-auto bg-red-500`}
                unoptimized
            />
        </Link>
    );
};

export default Logo;
