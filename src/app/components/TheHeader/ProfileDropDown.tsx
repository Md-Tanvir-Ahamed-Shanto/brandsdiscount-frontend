'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ChevronDown, Power, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { MyTokenPayload } from '@/app/(profile)/profile/page';
import { useGetSingleProfileQuery } from '@/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileDropDown = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const { data: userData } = useGetSingleProfileQuery(userId, {
        skip: !userId,
    });
    console.log("ProfileDropDown: user data", userData);
    console.log("ProfileDropDown: userId", userId);
    const [isLoginIn, setIsLoginIn] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    // Function to check login status and decode token
    const checkLoginStatus = () => {
        console.log('ProfileDropDown: Checking login status...');
        const token = Cookies.get('token');
        console.log('ProfileDropDown: Token found:', token ? 'Yes' : 'No');
        
        if (token) {
            try {
                const decoded = jwtDecode<MyTokenPayload>(token);
                console.log('ProfileDropDown: Token decoded successfully:', decoded);
                setIsLoginIn(true);
                setUserId(decoded.id);
            } catch (error) {
                console.error('ProfileDropDown: Error decoding token:', error);
                setIsLoginIn(false);
                setUserId(null);
            }
        } else {
            console.log('ProfileDropDown: No token found');
            setIsLoginIn(false);
            setUserId(null);
        }
    };

    useEffect(() => {
        // Initial check
        checkLoginStatus();

        // Add event listener for token changes
        const handleTokenChange = () => {
            console.log('ProfileDropDown: Token change event detected');
            checkLoginStatus();
        };

        // Listen for storage events (when token is set/removed in other tabs)
        window.addEventListener('storage', handleTokenChange);
        
        // Create a custom event for same-tab token changes
        window.addEventListener('tokenChange', handleTokenChange);

        // Set up an interval to periodically check for token changes
        const interval = setInterval(() => {
            const currentToken = Cookies.get('token');
            const hasTokenChanged = (currentToken && !isLoginIn) || (!currentToken && isLoginIn);
            if (hasTokenChanged) {
                console.log('ProfileDropDown: Token state changed detected by interval');
                checkLoginStatus();
            }
        }, 1000);

        return () => {
            window.removeEventListener('storage', handleTokenChange);
            window.removeEventListener('tokenChange', handleTokenChange);
            clearInterval(interval);
        };
    }, [isLoginIn]); // Include isLoginIn in dependency array

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('rtoken'); // if you're using refresh token
        setIsLoginIn(false);
        
        // Dispatch custom event to notify other components of token change
        window.dispatchEvent(new Event('tokenChange'));
        
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
                            <p className='font-medium text-sm truncate'>
                                {userData?.username || ''}
                            </p>
                            <p className='text-xs'>{userData?.role || ''}</p>
                        </div>
                        <div className='!w-9 !h-9 !rounded-full bg-main-400'>
                           <Avatar className='h-full w-full border-2 border-primary/20'>
                                <AvatarImage
                                    src={
                                        userData?.profilePicture?.url
                                    }
                                    alt={userData?.username}
                                />
                                <AvatarFallback>
                                    {userData?.username
                                        .substring(0, 1)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
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
