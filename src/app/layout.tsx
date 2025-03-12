import {
    FONT_DEFAULT,
    SITE_DESCRIPTION_DEFAULT,
    SITE_DOMAIN,
    SITE_TITLE_DEFAULT,
    SITE_TITLE_TEMPLATE_DEFAULT,
    SITE_VERIFICATION_GOOGLE_DEFAULT,
    switchThemeDuration
} from '@/config';
import { Metadata } from 'next';
import React from 'react';
import '../styles/global.css';
import { TheFooter, TheHeader } from './components';
import { ReduxProviders } from '@/providers';
import { ScrollTop } from '@/lib';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_DOMAIN),
    title: {
        default: SITE_TITLE_DEFAULT,
        template: SITE_TITLE_TEMPLATE_DEFAULT
    },
    description: SITE_DESCRIPTION_DEFAULT,
    verification: {
        google: SITE_VERIFICATION_GOOGLE_DEFAULT
    },
    icons: '/favicon.ico'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${FONT_DEFAULT.variable} ${switchThemeDuration}`}>
                <main className='scroll-smooth' suppressHydrationWarning>
                    <ReduxProviders>
                        <TheHeader />
                        {children}
                        <TheFooter />
                        <ScrollTop />
                    </ReduxProviders>
                </main>
            </body>
        </html>
    );
}
