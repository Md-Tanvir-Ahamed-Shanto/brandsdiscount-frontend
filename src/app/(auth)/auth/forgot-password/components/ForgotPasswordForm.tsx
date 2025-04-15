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
import toast from 'react-hot-toast';

const ForgotPasswordForm = () => {
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
                `${API_BASE_URL}/authroute/forgotPassword`,
                {
                    email: email
                }
            );
            if (response.data) {
                toast.success('Email Send successfully! Check Email!!');
                // window.location.href = '/';
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Email not valid');
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

            <Button
                type='submit'
                className='w-full bg-red-700 hover:bg-red-800 py-4 lg:py-6'
                disabled={isLoading}
            >
                {isLoading ? 'Sending...' : 'Send'}
            </Button>
        </form>
    );
};

export default ForgotPasswordForm;
