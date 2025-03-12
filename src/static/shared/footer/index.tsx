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
            { text: "Macy's Backstage", href: '#' },
            { text: 'Personal Stylist', href: '#' }
        ]
    },
    {
        title: "Macy's Inc.",
        links: [
            { text: 'Corporate Sites', href: '#' },
            { text: "About Macy's", href: '#' },
            { text: 'News Room', href: '#' },
            { text: 'Investors', href: '#' },
            { text: "Macy's Gives", href: '#' }
        ]
    }
];

export const SOCIAL_LINKS = [
    { icon: FacebookLogo, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
];

export const LEGAL_LINKS = [
    { text: 'Privacy Notice', href: '#' },
    { text: 'Cookie Preference', href: '#' },
    { text: 'Interest Based Ads', href: '#' },
    { text: 'CA Privacy Rights', href: '#' },
    { text: 'Do Not Sell or Share My Personal Information', href: '#' },
    { text: 'Legal Notice', href: '#' },
    { text: 'Customer Bill of Rights', href: '#' },
    { text: 'CA Transparency in Supply Chains', href: '#' },
    { text: 'Product Recalls', href: '#' },
    { text: 'Pricing policy', href: '#' },
    { text: 'Accessibility', href: '#' }
];
