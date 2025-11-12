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
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Password strength checker
    const checkPasswordStrength = (pwd: string) => {
        let strength = 0;
        if (pwd.length >= 6) strength += 1;
        if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength += 1;
        if (pwd.match(/[0-9]/)) strength += 1;
        if (pwd.match(/[^A-Za-z0-9]/)) strength += 1;
        return strength;
    };

    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            toast.error('Please enter a valid email address');
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${getBaseUrl()}/authroute/signup`,
                {
                    username: name.replace(/\s+/g, "") || email.split('@')[0],
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
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||
                error?.response?.data?.error ||
                'Something went wrong during signup';
            toast.error(errorMessage);
            console.error('Signup error:', error);
        } finally {
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
                    onChange={(e) => {
                        const newPassword = e.target.value;
                        setPassword(newPassword);
                        setPasswordStrength(checkPasswordStrength(newPassword));
                    }}
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
                {password && (
                    <div className='mt-2'>
                        <div className='flex justify-between items-center mb-1'>
                            <span className='text-xs text-muted-foreground'>Password strength:</span>
                            <span className={`text-xs font-medium ${
                                passwordStrength <= 1 ? 'text-red-500' :
                                passwordStrength <= 2 ? 'text-orange-500' :
                                passwordStrength <= 3 ? 'text-yellow-500' :
                                'text-green-500'
                            }`}>
                                {passwordStrength <= 1 ? 'Weak' :
                                 passwordStrength <= 2 ? 'Fair' :
                                 passwordStrength <= 3 ? 'Good' :
                                 'Strong'}
                            </span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-1'>
                            <div 
                                className={`h-1 rounded-full transition-all duration-300 ${
                                    passwordStrength <= 1 ? 'bg-red-500 w-1/4' :
                                    passwordStrength <= 2 ? 'bg-orange-500 w-1/2' :
                                    passwordStrength <= 3 ? 'bg-yellow-500 w-3/4' :
                                    'bg-green-500 w-full'
                                }`}
                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
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
                {isLoading ? (
                    <div className='flex items-center justify-center gap-2'>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        Creating account...
                    </div>
                ) : 'Sign Up'}
            </Button>
        </form>
    );
};

export default SignUpForm;
