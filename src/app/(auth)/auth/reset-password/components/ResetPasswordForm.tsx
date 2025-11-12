'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { API_BASE_URL } from '@/config';
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (!tokenParam) {
            toast.error('Invalid reset link. Please request a new password reset.');
            router.push('/auth/forgot-password');
            return;
        }
        setToken(tokenParam);
    }, [searchParams, router]);

    const validatePassword = (password: string): boolean => {
        const minLength = 8;

        if (password.length < minLength) {
            toast.error('Password must be at least 8 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) {
            toast.error('Invalid reset token');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!validatePassword(newPassword)) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/authroute/reset-password`,
                {
                    token: token,
                    newPassword: newPassword
                }
            );

            if (response.data) {
                toast.success('Password reset successfully! Redirecting to login...');
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            }
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.error) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error('Failed to reset password. Please try again.');
                }
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    };

    if (!token) {
        return (
            <div className='text-center py-8'>
                <p className='text-red-600 mb-4'>Invalid reset link</p>
                <Link href='/auth/forgot-password' className='text-blue-600 underline'>
                    Request a new password reset
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4 mb-4'>
            <div className='space-y-1 relative'>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className='border border-gray-600 lg:py-6 pr-10'
                />
                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <div className='space-y-1 relative'>
                <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm New Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className='border border-gray-600 lg:py-6 pr-10'
                />
                <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <Button
                type='submit'
                className='w-full bg-red-700 hover:bg-red-800 py-4 lg:py-6'
                disabled={isLoading}
            >
                {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
        </form>
    );
};

export default ResetPasswordForm;