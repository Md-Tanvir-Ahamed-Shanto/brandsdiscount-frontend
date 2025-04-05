'use client';
import { SIDEBAR_MENUS } from '@/static';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const ProfileSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [labelSelect, setLabelSelect] = useState('');

    useEffect(() => {
        const activeItem = SIDEBAR_MENUS.find(
            (item) => item?.route === pathname
        );
        if (activeItem) {
            setLabelSelect(activeItem.label);
        }
    }, [pathname]);

    const handleDropdownClick = (route: string, label: string) => {
        setDropdownOpen(false);
        setLabelSelect(label);
        router.push(route);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('rtoken');
        router.push('/');
        toast.success('Log out successfully');
    };

    return (
        <>
            <div className='hidden lg:flex border-r-2 border-[#C9C9C9] flex-col p-4'>
                {SIDEBAR_MENUS?.map((item) => {
                    const isActive = pathname === item?.route;
                    return (
                        <div
                            key={item?.id}
                            className={`mb-2 p-2.5 rounded-md transition-colors duration-300 
                            cursor-pointer ${isActive ? 'font-semibold' : 'hover:font-semibold'}`}
                        >
                            {item?.id === 5 ? (
                                <button onClick={handleLogout}>
                                    {item?.label}
                                </button>
                            ) : (
                                <Link href={item?.route ?? ''}>
                                    {item?.label}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className='lg:hidden p-4 relative'>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className='w-full flex justify-between items-center p-3 border 
                    rounded-md shadow-md bg-white'
                >
                    {labelSelect ? labelSelect : 'Profile Details'}
                    <ChevronDown
                        className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {dropdownOpen && (
                    <div className='absolute w-[95%] mt-2 border rounded-md shadow-md bg-white z-10'>
                        {SIDEBAR_MENUS?.map((item) => (
                            <div
                                key={item?.id}
                                className={`p-2.5 border-b last:border-b-0 cursor-pointer 
                                ${
                                    pathname === item?.route
                                        ? 'font-semibold text-purple-600'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => {
                                    handleDropdownClick(
                                        item?.route ?? '/',
                                        item?.label ?? ''
                                    );
                                }}
                            >
                                {item?.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfileSidebar;
