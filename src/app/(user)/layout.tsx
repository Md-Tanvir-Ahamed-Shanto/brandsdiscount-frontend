import React from 'react';
import { TheFooter, TheHeader } from '../components';
import '../../styles/global.css';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='scroll-smooth'>
            <TheHeader />
            {children}
            <TheFooter />
        </main>
    );
}
