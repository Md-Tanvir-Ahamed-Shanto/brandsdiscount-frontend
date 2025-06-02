/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import type React from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    ACCESS_TOKEN_EXPIRY,
    API_BASE_URL,
    getBaseUrl,
    REFRESH_TOKEN_EXPIRY
} from '@/config';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${getBaseUrl()}/authroute/signup`,
                {
                    username: name,
                    password,
                    email,
                    role: 'PlatformUser'
                }
            );
            if (response.data) {
                toast.success('Sign Up successful!');
                const { access_token, refresh_token } = response.data;
                Cookies.set('token', access_token, {
                    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY),
                    path: '/'
                });
                Cookies.set('rtoken', refresh_token, {
                    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY),
                    path: '/'
                });
                window.location.href = '/cart';
                setIsLoading(false);
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    'Something went wrong during signup'
            );
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4 mb-4'>
            <div className='space-y-1'>
                <Input
                    type='text'
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='border border-gray-600 lg:py-6'
                />
            </div>

            <div className='space-y-1'>
                <Input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border border-gray-600 lg:py-6'
                />
            </div>

            <div className='space-y-1 relative'>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='border border-gray-600 lg:py-6'
                />
                <button
                    type='button'
                    className='absolute right-3 top-4 lg:top-5 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>

            {/* <div className='space-y-1 relative'>
                <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    value={password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className='border border-gray-600 lg:py-6'
                />
                <button
                    type='button'
                    className='absolute right-3 top-4 lg:top-5 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
            </div> */}

            <div className='flex items-start'>
                <div className='flex items-center h-5'>
                    <Checkbox
                        id='keep-signed'
                        checked={keepSignedIn}
                        onCheckedChange={(checked) =>
                            setKeepSignedIn(checked as boolean)
                        }
                        className='mt-2'
                    />
                </div>
                <div className='ml-2'>
                    <label htmlFor='keep-signed' className='text-sm'>
                        Keep me signed in.{' '}
                        <Link href='/privacy-policy' className='underline'>
                            Details
                        </Link>
                    </label>
                    <p className='text-xs text-muted-foreground'>
                        Uncheck if on a public device
                    </p>
                </div>
            </div>

            <Button
                type='submit'
                className='w-full bg-red-700 hover:bg-red-800 py-4 lg:py-6'
                disabled={isLoading}
            >
                {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
        </form>
    );
};

export default SignUpForm;
