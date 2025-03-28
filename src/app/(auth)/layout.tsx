import React from 'react';
import '../../styles/global.css';
import { AuthFooter, AuthHeader } from '../components';

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className='scroll-smooth'>
            <AuthHeader />
            {children}
            <AuthFooter />
        </main>
    );
}
