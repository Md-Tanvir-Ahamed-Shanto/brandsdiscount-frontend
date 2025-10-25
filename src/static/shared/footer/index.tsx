import {
    Facebook as FacebookLogo,
    Instagram,
    Twitter,
    Youtube
} from 'lucide-react';

// Footer section data using arrays
export const FOOTER_SECTIONS = [
    {
        title: 'Customer Service',
        links: [
            { text: 'Help & FAQs', href: '#' },
            { text: 'Order Tracking', href: '#' },
            { text: 'Shipping & Delivery', href: '#' },
            { text: 'Returns', href: '#' },
            { text: 'Contact Us', href: '#' },
            { text: 'Shipping To', href: '#' }
        ]
    },
    {
        title: 'Our Stores',
        links: [
            { text: 'Find a Store', href: '#' },
            { text: 'Tell Us What You Think', href: '#' },
            { text: "Brand Discount's Backstage", href: '#' },
            { text: 'Personal Stylist', href: '#' }
        ]
    },
    {
        title: "Brand Discount's Inc.",
        links: [
            { text: 'Corporate Sites', href: '#' },
            { text: "About Brand Discount's", href: '#' },
            { text: 'News Room', href: '#' },
            { text: 'Investors', href: '#' },
            { text: "Brand Discount's Gives", href: '#' }
        ]
    }
];

export const SOCIAL_LINKS = [
    { icon: FacebookLogo, href: 'https://www.facebook.com/brandsdiscountsusa', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/brandsdiscounts.official/', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/BrandsDiscount_', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/@BrandsDiscounts/', label: 'YouTube' }
];

export const LEGAL_LINKS = [
    { text: 'CONTACT', href: '/contact-us' },
    { text: 'RETURNS POLICY', href: '/refund-returns' },
    { text: 'PRIVACY POLICY', href: '/privacy-policy' },
    { text: 'TERMS OF SERVICE', href: '/terms-of-service' },
    { text: 'ABOUT US', href: '/about' },
    { text: 'FAQ', href: '/faq' },
    { text: 'SHIPPING', href: '/shipping' },
    { text: 'PAYMENT POLICY', href: '/payment-policy' }
];
