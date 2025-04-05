/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import '../../styles/global.css';
import { AuthFooter, AuthHeader } from '../components';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.replace('/profile');
        }
    }, []);
    return (
        <main className='scroll-smooth'>
            <AuthHeader />
            {children}
            <AuthFooter />
        </main>
    );
}
