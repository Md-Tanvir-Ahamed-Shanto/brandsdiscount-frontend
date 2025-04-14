'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

interface MyTokenPayload {
    id: string;
}

export default function ChangePasswordAccordion() {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState<{
        oldPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
        form?: string;
    }>({});

    const validateForm = () => {
        const newErrors: {
            oldPassword?: string;
            newPassword?: string;
            confirmPassword?: string;
            form?: string;
        } = {};
        let isValid = true;

        if (!oldPassword) {
            newErrors.oldPassword = 'Old password is required';
            isValid = false;
        }

        if (!newPassword) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your new password';
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('password', newPassword);

            try {
                // Simulate API call
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                await new Promise((resolve) => setTimeout(resolve, 2000));

                const response = await axios.put(
                    `${API_BASE_URL}/userroute/update/${userId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log(response);

                // Reset form
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setErrors({});

                // Show success message
                alert('Password updated successfully');
            } catch (error) {
                console.error('Error updating password:', error);
                setErrors({
                    form: 'Failed to update password. Please try again.'
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const token = Cookies.get('token');
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<MyTokenPayload>(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [token]);

    return (
        <Card className='border-0 shadow-none bg-[#192133] text-white px-4 pt-4'>
            <CardContent className='p-0'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='old-password'>Old Password</Label>
                        <div className='relative'>
                            <Input
                                id='old-password'
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className={`border px-3 py-2 text-black ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 '
                                onClick={() =>
                                    setShowOldPassword(!showOldPassword)
                                }
                            >
                                {showOldPassword ? (
                                    <EyeOffIcon size={16} />
                                ) : (
                                    <EyeIcon size={16} />
                                )}
                            </button>
                        </div>
                        {errors.oldPassword && (
                            <p className='text-red-500 text-sm'>
                                {errors.oldPassword}
                            </p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='new-password'>New Password</Label>
                        <div className='relative'>
                            <Input
                                id='new-password'
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`border px-3 py-2 text-black ${errors.newPassword ? 'border-red-500' : ''}`}
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                                onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                }
                            >
                                {showNewPassword ? (
                                    <EyeOffIcon size={16} />
                                ) : (
                                    <EyeIcon size={16} />
                                )}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className='text-red-500 text-sm'>
                                {errors.newPassword}
                            </p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='confirm-password'>
                            Confirm New Password
                        </Label>
                        <div className='relative'>
                            <Input
                                id='confirm-password'
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className={`border px-3 py-2 text-black ${
                                    errors.confirmPassword
                                        ? 'border-red-500'
                                        : ''
                                }`}
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon size={16} />
                                ) : (
                                    <EyeIcon size={16} />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className='text-red-500 text-sm'>
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {errors.form && (
                        <div className='bg-red-50 text-red-500 p-3 rounded-md'>
                            {errors.form}
                        </div>
                    )}

                    <Button
                        type='submit'
                        className='w-full'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating...' : 'Change Password'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
