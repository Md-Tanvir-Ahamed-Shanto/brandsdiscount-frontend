'use client';
import { Icons, LinkButton, Logo } from '@/components';
import HeaderTop from './HeaderTop';
import SearchComponent from './SearchComponent';
import { useState } from 'react';
import ProfileDropDown from './ProfileDropDown';
import { RootState, useAppSelector } from '@/store';
import CategorySlider from '../CategorySlider';
import MobileMenu from './MegaMenuMobile';

const TheHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const cart = useAppSelector((state: RootState) => state.cart.products);
    return (
        <>
            <HeaderTop />
            {/* pc */}
            <header className='hidden lg:flex container items-center justify-between py-4'>
                <Logo />
                <SearchComponent />
                <div className='flex gap-4 min-w-[250px] justify-end items-center'>
                    <LinkButton href='/cart' className='-mr-6 flex gap-2'>
                        <span className='text-main-300'>
                            {cart?.length || 0}
                        </span>
                        <Icons.ShoppingBag className='text-gray-800' />
                    </LinkButton>
                    <ProfileDropDown />
                </div>
            </header>
            {/* mobile */}
            <header className='block lg:hidden !w-full mb-4'>
                <div className='flex container items-center justify-between py-4'>
                    <div className='flex gap-2  min-w-[100px]'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='-ml-4'
                        >
                            <Icons.Menu className='text-gray-800' />
                        </button>
                        <Logo />
                    </div>
                    <div className='flex gap-4 min-w-[150px] !justify-end !items-center'>
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

            <CategorySlider />
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};
export default TheHeader;
