import React from 'react';
import { ConditionalAuth, LoginForm } from './components';
import Link from 'next/link';

const page = () => {
    return (
        <div className='h-full'>
            <div className='container py-[74px] lg:py-32'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 lg:col-span-4'>
                        <h1 className='text-2xl lg:text-4xl font-semibold mb-4 lg:mb-8'>
                            Sign In
                        </h1>
                        <LoginForm />
                        <div className='text-center'>
                            <Link
                                href='/auth/forgot-password'
                                className='text-sm underline'
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <div className='col-span-2'></div>
                    <div className='col-span-12 lg:col-span-6 lg:flex lg:justify-items-end'>
                        <ConditionalAuth type='signup' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
