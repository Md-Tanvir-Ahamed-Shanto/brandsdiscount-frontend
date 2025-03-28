import React from 'react';
import '../../styles/global.css';
import { ReduxProviders } from '@/providers'; 
 
export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body>
                <ReduxProviders>
                    {children}
                </ReduxProviders>
            </body>
        </html>
    );
}
