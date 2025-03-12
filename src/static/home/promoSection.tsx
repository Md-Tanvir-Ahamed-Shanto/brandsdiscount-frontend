import { Mail, Truck, Globe, Store } from 'lucide-react';

// Define the promo items as an array for mapping
export const PROMO_ITEMS = [
    {
        icon: Mail,
        title: 'Sign up for emails & get an extra 25% off',
        description:
            'Save on your next purchase & discover our latest offers. Exclusions apply. Valid for international customers only.',
        linkText: 'Sign Up',
        linkHref: '/shop'
    },
    {
        icon: Truck,
        title: 'We now ship to over 200 locations worldwide',
        description:
            'Shop your favorite brands & send to friends & family around the globe.',
        linkText: 'Select Your Location',
        linkHref: '/shop'
    },
    {
        icon: Globe,
        title: 'Check out our international shipping FAQs',
        description:
            'Find the answers to some of our most commonly asked questions.',
        linkText: 'Get The Details',
        linkHref: '/shop'
    },
    {
        icon: Store,
        title: 'Visit the U.S. and come shop in store',
        description: 'Get style inspo, gift ideas, great deals & more.',
        linkText: 'Find A Store',
        linkHref: '/shop'
    }
];
