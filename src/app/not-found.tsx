'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
    const router = useRouter();

    return (
        <div className='not-found-container'>
            <div className='content-wrapper '>
                <h1 className='error-code'>404</h1>
                <h2 className='error-message'>Oops! Page Not Found</h2>
                <p className='description'>
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable.
                </p>
                <button
                    className='home-button !bg-gray-800'
                    onClick={() => router.push('/')}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
