import React from 'react';
import '../../styles/global.css';
import { ReduxProviders } from '@/providers';
import AuthRedirect from './components/authRedirect';

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthRedirect />
            <ReduxProviders>{children}</ReduxProviders>
        </>
    );
}
