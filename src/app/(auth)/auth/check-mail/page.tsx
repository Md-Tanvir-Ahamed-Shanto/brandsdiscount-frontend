import Link from 'next/link';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Card } from '@/components/ui/card';

const page = () => {
    return (
        <div className='h-full'>
            <div className='container py-[40px]'>
                <div className='flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
                    <Card className='w-full max-w-md overflow-hidden p-6 text-center shadow-lg sm:rounded-xl'>
                        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                            <Mail className='h-8 w-8 text-primary' />
                        </div>

                        <h1 className='mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                            Check Your Email
                        </h1>

                        <p className='mt-3 text-gray-600'>
                            We have sent a confirmation link to your email
                            address. Please check your inbox and click the link
                            to activate your account.
                        </p>

                        <div className='mt-6 flex items-center justify-center gap-2 text-sm text-gray-500'>
                            <CheckCircle className='h-4 w-4 text-green-500' />
                            <span>Email sent successfully</span>
                        </div>

                        <div className='mt-8'>
                            <Button asChild className='w-full'>
                                <Link href='/auth/login'>
                                    Go to Sign In Page
                                </Link>
                            </Button>
                        </div>

                        <p className='mt-4 text-sm text-gray-500'>
                            Didnot receive an email? Check your spam folder or{' '}
                            <Link
                                href='/auth/signup'
                                className='text-primary hover:underline'
                            >
                                resend confirmation
                            </Link>
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default page;
