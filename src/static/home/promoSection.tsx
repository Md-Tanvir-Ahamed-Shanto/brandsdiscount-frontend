import { Gem, Gift, Hourglass, Rocket } from 'lucide-react';

// Define the promo items as an array for mapping
export const PROMO_ITEMS = [
    {
        icon: Rocket,
        title: '$10 Welcome Pick',
        description: 'Spend $60, choose any one item for just $10',
        linkText: 'Sign Up',
        linkHref: '/shop'
    },
    {
        icon: Gem,
        title: 'Point-for-Dollar',
        description: 'Earn 1 pt for every $1 spent (100 pts = $1 off)',
        linkText: 'Select Your Location',
        linkHref: '/shop'
    },
    {
        icon: Gift,
        title: 'Member Exclusives',
        description: 'Birthday treats, early-access drops, double-point days',
        linkText: 'Get The Details',
        linkHref: '/shop'
    },
    {
        icon: Hourglass,
        title: 'Flash-Deal Fun',
        description: 'Hourly progress bar reveals surprise rewards',
        linkText: 'Find A Store',
        linkHref: '/shop'
    }
];
