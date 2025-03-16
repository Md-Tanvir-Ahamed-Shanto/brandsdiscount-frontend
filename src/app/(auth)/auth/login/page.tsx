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
    REFRESH_TOKEN_EXPIRY
} from '@/config';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/authroute/login`,
                {
                    username: email,
                    password
                }
            );
            if (response.data) {
                const { access_token, refresh_token } = response.data;
                Cookies.set('token', access_token, {
                    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY),
                    path: '/'
                });
                Cookies.set('rtoken', refresh_token, {
                    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY),
                    path: '/'
                });
                window.location.href = '/checkout';
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen'>
            <div className='flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20'>
                <div className='mx-auto w-full max-w-sm'>
                    <div className='space-y-6'>
                        <div>
                            <h1 className='text-2xl font-semibold'>Sign In</h1>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className='space-y-1'>
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-1 relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className='pr-16'
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            <div className='text-sm text-muted-foreground'>
                                Case sensitive
                            </div>

                            <div className='flex items-start'>
                                <div className='flex items-center h-5'>
                                    <Checkbox
                                        id='keep-signed'
                                        checked={keepSignedIn}
                                        onCheckedChange={(checked) =>
                                            setKeepSignedIn(checked as boolean)
                                        }
                                    />
                                </div>
                                <div className='ml-2'>
                                    <label
                                        htmlFor='keep-signed'
                                        className='text-sm'
                                    >
                                        Keep me signed in.{' '}
                                        <Link
                                            href='/details'
                                            className='underline'
                                        >
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
                                className='w-full bg-red-700 hover:bg-red-800'
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Button>

                            <div className='text-center'>
                                <Link
                                    href='/forgot-password'
                                    className='text-sm underline'
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='hidden lg:flex lg:flex-1 flex-col justify-center items-center'>
                <div className='text-center space-y-4'>
                    <h2 className='text-xl font-semibold'>No account yet?</h2>
                    <Button
                        variant='outline'
                        className='w-full max-w-sm'
                        onClick={() => alert('Sign Up')}
                    >
                        Create Account
                    </Button>
                </div>
            </div>
        </div>
    );
}
