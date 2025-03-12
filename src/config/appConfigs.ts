import { Outfit } from 'next/font/google';

export const SITE_TITLE_DEFAULT =
    'event-discount | A Smart Solutions for covert money';
export const SITE_TITLE_TEMPLATE_DEFAULT = `%s - event-discount`;
export const SITE_DESCRIPTION_DEFAULT = 'event-discount Description';
export const SITE_VERIFICATION_GOOGLE_DEFAULT =
    'google-site-verification=adwdawdaw';

export const getBaseUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || '';
};

export const FONT_DEFAULT = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit-sans'
});
