'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [progress, setProgress] = useState(0);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        // You would typically call your API here to verify the token
        // For example: verifyEmailToken(token)

        // Simulate API call and progress
        const startTime = Date.now();
        const duration = 2500; // 2.5 seconds

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(interval);
                setIsVerified(true);
                // Here you would handle the API response
            }
        }, 50);

        return () => clearInterval(interval);
    }, [token]);

    const goToHomepage = () => {
        router.push('/');
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50'>
            <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
                <div className='mb-6 text-center'>
                    <h1 className='mb-2 text-2xl font-bold text-gray-900'>
                        Email Verification
                    </h1>
                    <p className='text-gray-600'>
                        {!isVerified
                            ? 'Please wait while we verify your email...'
                            : 'Your email has been successfully verified!'}
                    </p>
                </div>

                {!isVerified ? (
                    <div className='space-y-4'>
                        <Progress value={progress} className='h-2 w-full' />
                        <p className='text-center text-sm text-gray-500'>
                            Verifying token: {token}
                        </p>
                    </div>
                ) : (
                    <div className='flex flex-col items-center space-y-6'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
                            <CheckCircle className='h-10 w-10 text-green-500' />
                        </div>
                        <p className='text-xl font-medium text-gray-900'>
                            Email is verified
                        </p>
                        <Button onClick={goToHomepage} className='w-full'>
                            Visit Homepage
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
