'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { PasswordInput } from './components';
import { useUpdatePasswordMutation } from '@/api';
import { jwtDecode } from 'jwt-decode';
import { MyTokenPayload } from '@/app/(profile)/profile/page';
import Cookies from 'js-cookie';

export default function ChangePassword() {
    const [userId, setUserId] = useState<string | null>(null);
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
        } else if (newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
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
            const formData = new FormData();

            formData.append('password', JSON.stringify(newPassword));

            const res = await updatePassword({ id: userId, formData });

            console.log('🚀 ~ handleSubmit ~ res:', res);
            /* if (res?.data) {
                toast.success('Password updated successfully');
            } */

            // Reset form
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
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
        <div className='flex items-center p-4'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Change Password</CardTitle>
                    <CardDescription>
                        Update your password by filling out the form below.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className='space-y-4'>
                        <PasswordInput
                            id='old-password'
                            label='Old Password'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            error={errors.oldPassword}
                        />

                        <PasswordInput
                            id='new-password'
                            label='New Password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={errors.newPassword}
                        />

                        <PasswordInput
                            id='confirm-password'
                            label='Confirm New Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors.confirmPassword}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading' : 'Change Password'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
