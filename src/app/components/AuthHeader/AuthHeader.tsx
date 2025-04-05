import { Logo } from '@/components';
import React from 'react';

const AuthHeader = () => {
    return (
        <>
            <header className='flex container items-center justify-between py-4'>
                <Logo />
            </header>
            <div className='border-b border-gray-200 w-full'></div>
        </>
    );
};

export default AuthHeader;
