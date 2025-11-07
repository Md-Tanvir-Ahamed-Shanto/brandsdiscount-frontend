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
    getBaseUrl,
    REFRESH_TOKEN_EXPIRY
} from '@/config';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            toast.error('Please enter a valid email address');
            return;
        }
        
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${getBaseUrl()}/authroute/login`,
                {
                    username: email,
                    password
                }
            );
            if (response.data) {
                toast.success('Login successfully!');
                const { access_token, refresh_token } = response.data;
                
                console.log('Login response:', response.data);
                console.log('Setting cookies:', { access_token, refresh_token });
                
                // Set cookies without expiry (session cookies) or with proper expiry
                const cookieOptions = {
                    path: '/',
                    ...(keepSignedIn && { expires: 7 }) // 7 days if keep signed in
                };
                
                Cookies.set('token', access_token, cookieOptions);
                Cookies.set('rtoken', refresh_token, cookieOptions);
                
                console.log('Cookies set, dispatching tokenChange event');
                // Dispatch custom event to notify other components of token change
                window.dispatchEvent(new Event('tokenChange'));
                
                // Add a small delay to ensure event is processed
                setTimeout(() => {
                    console.log('Redirecting to home page...');
                    window.location.href = '/';
                }, 100);
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||
                error?.response?.data?.error ||
                'Email or password not valid';
            toast.error(errorMessage);
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4 mb-4'>
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
                {isLoading ? (
                    <div className='flex items-center justify-center gap-2'>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        Signing in...
                    </div>
                ) : 'Sign In'}
            </Button>
        </form>
    );
};

export default LoginForm;
