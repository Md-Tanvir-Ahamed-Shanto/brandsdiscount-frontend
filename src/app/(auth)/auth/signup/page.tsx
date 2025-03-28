import React from 'react';
import { ConditionalAuth } from '../login/components';
import { SignUpForm } from './components';

const page = () => {
    return (
        <div className='h-full'>
            <div className='container py-[74px]'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12 lg:col-span-4'>
                        <h1 className='text-2xl lg:text-4xl font-semibold mb-4 lg:mb-8'>
                            Sign Up
                        </h1>
                        <SignUpForm />
                    </div>
                    <div className='col-span-2'></div>
                    <div className='col-span-12 lg:col-span-6 lg:flex lg:justify-items-end'>
                        <ConditionalAuth type='login' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
