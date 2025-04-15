'use client';
import Link from 'next/link';
import React from 'react';

const ConditionalAuth = ({ type }: { type: string }) => {
    return (
        <div className='flex lg:flex-1 flex-col justify-center items-center'>
            <div className='text-center space-y-4 w-full lg:w-[70%]'>
                <h1 className='text-xl lg:text-3xl font-semibold mb-4 lg:mb-8'>
                    {type === 'signup'
                        ? `Don't have an account?`
                        : `Already have an account?`}
                </h1>
                <Link
                    href={type === 'signup' ? '/auth/signup' : '/auth/login'}
                    className='!w-full bg-transparent hover:bg-red-800 hover:text-white py-2 lg:py-3 rounded font-semibold text-center border-2 border-red-700 transition-colors delay-150 duration-150 !block'
                >
                    {type === 'signup' ? `Create Account` : `Log in`}
                </Link>
            </div>
        </div>
    );
};

export default ConditionalAuth;
