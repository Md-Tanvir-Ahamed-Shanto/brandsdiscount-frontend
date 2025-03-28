import { Outfit } from 'next/font/google';

export const SITE_TITLE_DEFAULT =
    'Brands Discounts | Get amazing deals on all your favourite brands';
export const SITE_TITLE_TEMPLATE_DEFAULT = `%s - Brands Discounts`;
export const SITE_DESCRIPTION_DEFAULT = 'Discover stylish womens clothing, shoes, and accessories at outlet prices on Brands Discounts.';
export const SITE_VERIFICATION_GOOGLE_DEFAULT =
    'google-site-verification=adwdawdaw';
    
export const APP_NAME = 'Brands Discounts App';
export const APP_DEFAULT_TITLE = 
    'Brands Discounts | Get amazing deals on all your favourite brands';
export const APP_TITLE_TEMPLATE = '%s - Brands Discounts';
export const APP_DESCRIPTION = 'Discover stylish womens clothing, shoes, and accessories at outlet prices on Brands Discounts.';
    

    
export const getBaseUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || '';
};

export const FONT_DEFAULT = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit-sans'
});
