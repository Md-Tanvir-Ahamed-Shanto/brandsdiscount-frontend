'use client';
import type React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { API_BASE_URL } from '@/config';
import toast from 'react-hot-toast';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/authroute/forgot-password`,
                {
                    email: email
                }
            );
            
            if (response.data) {
                setIsSuccess(true);
                toast.success('Password reset email sent! Please check your inbox.');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    toast.error('Too many requests. Please try again later.');
                } else if (error.response?.data?.error) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error('Failed to send reset email. Please try again.');
                }
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className='space-y-4 mb-4'>
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                            <svg className='h-5 w-5 text-green-400' viewBox='0 0 20 20' fill='currentColor'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm font-medium text-green-800'>
                                Password reset email sent!
                            </p>
                            <p className='text-sm text-green-700 mt-1'>
                                Please check your inbox at <strong>{email}</strong> for instructions to reset your password.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <Link
                        href='/auth/login'
                        className='text-sm text-blue-600 hover:text-blue-800 underline'
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4 mb-4'>
            <div className='space-y-1'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                    Email Address
                </label>
                <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border border-gray-600 lg:py-6'
                    disabled={isLoading}
                />
            </div>

            <Button
                type='submit'
                className='w-full bg-red-700 hover:bg-red-800 py-4 lg:py-6'
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        Sending...
                    </>
                ) : (
                    'Send Reset Email'
                )}
            </Button>
        </form>
    );
};

export default ForgotPasswordForm;
