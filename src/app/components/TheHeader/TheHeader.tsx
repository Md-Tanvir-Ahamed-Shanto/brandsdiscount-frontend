'use client';
import { Icons, LinkButton, Logo } from '@/components';
import HeaderTop from './HeaderTop';
import SearchComponent from './SearchComponent';
import { MegaMenu } from './MegaMenu';
import MobileMenu from './MegaMenuMobile';
import { useState } from 'react';
import ProfileDropDown from './ProfileDropDown';

const TheHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <HeaderTop />

            {/* pc */}
            <header className='hidden lg:flex container items-center justify-between py-4'>
                <Logo />
                <SearchComponent />
                <div className='flex gap-4 min-w-[250px] justify-end items-center'>
                    <LinkButton href='/checkout' className='-mr-6'>
                        <Icons.ShoppingBag className='text-gray-800' />
                    </LinkButton>
                    <ProfileDropDown />
                </div>
            </header>
            {/* mobile */}
            <header className='block lg:hidden !w-full mb-4'>
                <div className='flex container items-center justify-between py-4'>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='-ml-4'
                        >
                            <Icons.Menu className='text-gray-800' />
                        </button>
                        <Logo />
                    </div>
                    <div className='flex gap-4 min-w-[250px] justify-end items-center'>
                        <LinkButton href='/checkout' className='-mr-6'>
                            <Icons.ShoppingBag className='text-gray-800' />
                        </LinkButton>
                        <ProfileDropDown />
                    </div>
                </div>
                <div className='px-4 lg:px-0'>
                    <SearchComponent />
                </div>
            </header>

            <MegaMenu />
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};
export default TheHeader;
