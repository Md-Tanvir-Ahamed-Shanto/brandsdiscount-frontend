'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ChevronDown, Power, UserRound } from 'lucide-react';
import Avatar from '@/components/Avatar';
import toast from 'react-hot-toast';

const ProfileDropDown = () => {
    const [isLoginIn, setIsLoginIn] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoginIn(true);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('rtoken'); // if you're using refresh token
        setIsLoginIn(false);
        router.push('/');
        toast.success('Log out successfully');
    };

    return (
        <>
            {!isLoginIn ? (
                <Link
                    href='/auth/login'
                    className='bg-main-400 hover:bg-main-500 
            text-main-300 py-1.5 px-4 rounded-lg inline-block pl-4 font-semibold'
                >
                    Sign In
                </Link>
            ) : (
                <div
                    className='relative'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className='flex gap-4 items-center p-2 rounded-md cursor-pointer'>
                        <div className='hidden xs:block'>
                            <p className='font-medium text-sm'>
                                Nisharga Kabir
                            </p>
                            <p className='text-xs'>user</p>
                        </div>
                        <div className='!w-9 !h-9 rounded-full bg-main-400'>
                            <Avatar
                                src='/logos/male_avatar_two.png'
                                className='w-full h-full'
                            />
                        </div>
                        <ChevronDown className='min-w-5 min-h-5' />
                    </div>

                    {isHovered && (
                        <div
                            className='absolute left-0 bg-main-400 w-full overflow-hidden z-50
                rounded-b-xl'
                        >
                            <Link
                                href='/profile'
                                className='p-4 w-full text-sm text-main-300 hover:bg-main-500
                  flex items-center gap-1.5 font-medium rounded-xl'
                            >
                                <UserRound className='min-w-5 min-h-5' />{' '}
                                Profile Details
                            </Link>
                            <button
                                onClick={handleLogout}
                                className='w-full text-left p-4 text-sm text-main-300 
                  hover:bg-main-500 flex items-center gap-1.5 font-medium rounded-xl'
                            >
                                <Power className='min-w-5 min-h-5' /> Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ProfileDropDown;
