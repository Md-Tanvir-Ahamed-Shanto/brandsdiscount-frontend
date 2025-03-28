import {
    APP_DEFAULT_TITLE,
    APP_DESCRIPTION,
    APP_NAME,
    APP_TITLE_TEMPLATE,
    FONT_DEFAULT,
    SITE_DESCRIPTION_DEFAULT,
    SITE_DOMAIN,
    SITE_TITLE_DEFAULT,
    SITE_TITLE_TEMPLATE_DEFAULT,
    SITE_VERIFICATION_GOOGLE_DEFAULT,
    switchThemeDuration
} from '@/config';
import { Metadata, Viewport } from 'next';
import React from 'react';
import '../styles/global.css';
import { ReduxProviders } from '@/providers'; 


export const metadata: Metadata = {
    metadataBase: new URL(SITE_DOMAIN),
    applicationName: APP_NAME,
    title: {
        default: SITE_TITLE_DEFAULT,
        template: SITE_TITLE_TEMPLATE_DEFAULT
    },
    description: SITE_DESCRIPTION_DEFAULT,
    verification: {
        google: SITE_VERIFICATION_GOOGLE_DEFAULT
    },
    icons: '/favicon.ico',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE 
    },
    formatDetection: {
        telephone: false
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE
        },
        description: APP_DESCRIPTION
    },
    twitter: {
        card: 'summary',
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE
        },
        description: APP_DESCRIPTION
    }
};


export const viewport: Viewport = {
    themeColor: '#FFFFFF'
};


export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${FONT_DEFAULT.variable} ${switchThemeDuration}`}>
                <ReduxProviders>
                    {children}
                </ReduxProviders>
            </body>
        </html>
    );
}
