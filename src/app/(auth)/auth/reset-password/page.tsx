import React from 'react';
import { ResetPasswordForm } from './components';
import Link from 'next/link';

const page = () => {
    return (
        <div className='h-full'>
            <div className='container py-[74px] lg:py-32'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 lg:col-span-4'>
                        <h1 className='text-2xl lg:text-4xl font-semibold mb-4 lg:mb-8'>
                            Reset Password
                        </h1>
                        <p className='text-gray-600 mb-6'>
                            Enter your new password below to reset your account password.
                        </p>
                        <ResetPasswordForm />
                        <div className='text-center mt-4'>
                            <Link
                                href='/auth/login'
                                className='text-sm underline'
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                    <div className='col-span-2'></div>
                    <div className='col-span-12 lg:col-span-6 lg:flex lg:justify-items-end'>
                        <div className='bg-gray-100 p-8 rounded-lg w-full lg:w-96'>
                            <h3 className='text-lg font-semibold mb-4'>Password Requirements</h3>
                            <ul className='text-sm text-gray-600 space-y-2'>
                                <li>• At least 8 characters long</li>
                                <li>• Contains at least one uppercase letter</li>
                                <li>• Contains at least one lowercase letter</li>
                                <li>• Contains at least one number</li>
                                <li>• Contains at least one special character</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;