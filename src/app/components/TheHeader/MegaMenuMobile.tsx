'use client';
import Link from 'next/link';
import { MENU } from '@/static';
import React, { FC } from 'react';
import { X } from 'lucide-react';

interface IProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: FC<IProps> = ({ isOpen, setIsOpen }) => {
    return (
        <div className='lg:hidden'>
            {isOpen && (
                <div className='fixed !left-0 !top-0 w-full h-full inset-0 z-50 bg-white p-4 '>
                    <button
                        onClick={() => setIsOpen(false)}
                        className='mb-4 flex items-center justify-end w-full'
                    >
                        <X />
                    </button>
                    {(MENU ?? []).map(({ label, link, id }) => (
                        <div key={id} className='px-2'>
                            <Link
                                href={link}
                                onClick={() => setIsOpen(false)}
                                className='block text-center py-3 px-6 bg-main-500 text-black rounded hover:bg-main-500/60 hover:text-black transition-all duration-300 mb-2'
                            >
                                {label}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
