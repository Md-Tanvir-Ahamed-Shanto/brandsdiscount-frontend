'use client';
import type React from 'react';
import { useState } from 'react';
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

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{
        oldPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
        form?: string;
    }>({});
    const [isSuccess, setIsSuccess] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSuccess(false);

        if (validateForm()) {
            // Log passwords to console as requested
            console.log('Old Password:', oldPassword);
            console.log('New Password:', newPassword);

            // In a real app, you would call an API here to change the password
            setIsSuccess(true);

            // Reset form
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Change Password</CardTitle>
                    <CardDescription>
                        Update your password by filling out the form below.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className='space-y-4'>
                        {isSuccess && 'Password changed successfully!'}

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
                        <Button type='submit' className='w-full'>
                            Change Password
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
