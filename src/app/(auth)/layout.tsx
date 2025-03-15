import React from 'react';
import '../../styles/global.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='scroll-smooth flex min-h-screen items-center justify-center'>
            {children}
        </main>
    );
}
