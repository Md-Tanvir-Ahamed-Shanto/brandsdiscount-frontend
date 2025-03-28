import React from 'react';
import { AuthFooter, AuthHeader } from '../components';
import '../../styles/global.css';

export default function UserLayout({
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
