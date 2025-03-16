import { Icons, LinkButton, Logo } from '@/components';
import React from 'react';

const AuthHeader = () => {
    return (
        <>
            <header className='flex container items-center justify-between py-4'>
                <Logo />
                <LinkButton href='/'>
                    <Icons.ShoppingBag className='text-gray-800' />
                </LinkButton>
            </header>
            <div className='border-b border-gray-200 w-full'></div>
        </>
    );
};

export default AuthHeader;
