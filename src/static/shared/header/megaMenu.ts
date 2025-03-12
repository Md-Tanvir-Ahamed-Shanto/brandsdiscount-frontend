export type MenuCategory = {
    id: string;
    title: string;
    sections: {
        title: string;
        items: {
            name: string;
            href: string;
        }[];
    }[];
    featured?: {
        title: string;
        image: string;
        cta: string;
        href: string;
    };
};

export const menuData: MenuCategory[] = [
    {
        id: 'women',
        title: 'Women',
        sections: [
            {
                title: 'SHOP OUR TOP DEALS',
                items: [
                    { name: 'Shop All', href: '#' },
                    { name: '20-40% off New Spring Arrivals', href: '#' },
                    {
                        name: '40% off I.N.C. International Concepts',
                        href: '#'
                    },
                    { name: '20-50% off Sneakers: Nike & More', href: '#' },
                    { name: 'Up to 50% off Spring Break Sandals', href: '#' }
                ]
            },
            {
                title: 'NEW & TRENDING',
                items: [
                    { name: 'New Arrivals', href: '#' },
                    { name: 'Trending: Retro Sneakers', href: '#' },
                    { name: 'Vacation Shoes for Day to Night', href: '#' }
                ]
            }
        ],
        featured: {
            title: 'Spring Forward Sale',
            image: '/placeholder.svg?height=300&width=300',
            cta: 'Shop now',
            href: '#'
        }
    },
    {
        id: 'men',
        title: 'Men',
        sections: [
            {
                title: "MEN'S SHOES",
                items: [
                    { name: "All Men's Shoes", href: '#' },
                    { name: 'Athletic Shoes & Sneakers', href: '#' },
                    { name: 'Boots', href: '#' },
                    { name: 'Casual Shoes', href: '#' },
                    { name: 'Dress Shoes', href: '#' },
                    { name: 'Loafers & Drivers', href: '#' },
                    { name: 'Designer Shoes', href: '#' }
                ]
            },
            {
                title: "MEN'S CLOTHING",
                items: [
                    { name: "All Men's Clothing", href: '#' },
                    { name: 'Activewear', href: '#' },
                    { name: 'Casual Shirts', href: '#' },
                    { name: 'Dress Shirts', href: '#' },
                    { name: 'Jeans', href: '#' },
                    { name: 'Pants', href: '#' }
                ]
            }
        ]
    },
    {
        id: 'kids',
        title: 'Kids & Baby',
        sections: [
            {
                title: "KIDS' SHOES",
                items: [
                    { name: "All Kids' Shoes", href: '#' },
                    { name: 'Baby Shoes', href: '#' },
                    { name: "Boys' Shoes", href: '#' },
                    { name: "Girls' Shoes", href: '#' }
                ]
            },
            {
                title: "KIDS' CLOTHING",
                items: [
                    { name: "All Kids' Clothing", href: '#' },
                    { name: 'Baby Clothing', href: '#' },
                    { name: "Boys' Clothing", href: '#' },
                    { name: "Girls' Clothing", href: '#' }
                ]
            }
        ]
    },
    {
        id: 'home',
        title: 'Home',
        sections: [
            {
                title: 'BEDDING & BATH',
                items: [
                    { name: 'All Bedding', href: '#' },
                    { name: 'Comforter Sets', href: '#' },
                    { name: 'Sheets', href: '#' },
                    { name: 'Pillows', href: '#' },
                    { name: 'Bath Towels', href: '#' }
                ]
            },
            {
                title: 'KITCHEN & DINING',
                items: [
                    { name: 'Cookware', href: '#' },
                    { name: 'Small Appliances', href: '#' },
                    { name: 'Dinnerware', href: '#' },
                    { name: 'Glassware', href: '#' }
                ]
            }
        ]
    },
    {
        id: 'shoes',
        title: 'Shoes',
        sections: [
            {
                title: "WOMEN'S SHOES",
                items: [
                    { name: "All Women's Shoes", href: '#' },
                    { name: 'Sandals', href: '#' },
                    { name: 'Sneakers & Athletic Shoes', href: '#' },
                    { name: 'Clogs', href: '#' },
                    { name: 'Comfort Shoes', href: '#' },
                    { name: 'Flats', href: '#' },
                    { name: 'Heels', href: '#' },
                    { name: 'Loafers', href: '#' },
                    { name: 'Mules & Slides', href: '#' },
                    { name: 'Boots', href: '#' },
                    { name: 'Ankle Boots & Booties', href: '#' },
                    { name: 'Slippers', href: '#' },
                    { name: 'Wedding & Bridal', href: '#' },
                    { name: 'Wedges', href: '#' }
                ]
            },
            {
                title: "FEATURED WOMEN'S BRANDS",
                items: [
                    { name: 'All Shoe Brands', href: '#' },
                    { name: 'Clarks', href: '#' },
                    { name: 'Franco Sarto', href: '#' },
                    { name: 'Naturalizer', href: '#' },
                    { name: 'Nike', href: '#' },
                    { name: 'Sam Edelman', href: '#' },
                    { name: 'Skechers', href: '#' },
                    { name: 'Steve Madden', href: '#' }
                ]
            },
            {
                title: "EXCLUSIVELY AT MACY'S",
                items: [{ name: 'Wild Pair', href: '#' }]
            }
        ]
    },
    {
        id: 'handbags',
        title: 'Handbags & Accessories',
        sections: [
            {
                title: 'HANDBAGS',
                items: [
                    { name: 'All Handbags', href: '#' },
                    { name: 'Backpacks', href: '#' },
                    { name: 'Crossbody Bags', href: '#' },
                    { name: 'Satchels', href: '#' },
                    { name: 'Shoulder Bags', href: '#' },
                    { name: 'Tote Bags', href: '#' }
                ]
            },
            {
                title: 'ACCESSORIES',
                items: [
                    { name: 'All Accessories', href: '#' },
                    { name: 'Belts', href: '#' },
                    { name: 'Hats', href: '#' },
                    { name: 'Scarves & Wraps', href: '#' },
                    { name: 'Sunglasses', href: '#' }
                ]
            }
        ]
    },
    {
        id: 'jewelry',
        title: 'Jewelry',
        sections: [
            {
                title: 'FINE JEWELRY',
                items: [
                    { name: 'All Fine Jewelry', href: '#' },
                    { name: 'Diamonds', href: '#' },
                    { name: 'Gold', href: '#' },
                    { name: 'Gemstones', href: '#' },
                    { name: 'Pearls', href: '#' }
                ]
            },
            {
                title: 'FASHION JEWELRY',
                items: [
                    { name: 'All Fashion Jewelry', href: '#' },
                    { name: 'Bracelets', href: '#' },
                    { name: 'Earrings', href: '#' },
                    { name: 'Necklaces', href: '#' },
                    { name: 'Rings', href: '#' }
                ]
            }
        ]
    },
    {
        id: 'sale',
        title: 'Sale',
        sections: [
            {
                title: 'SALE & CLEARANCE',
                items: [
                    { name: "Women's Sale", href: '#' },
                    { name: "Men's Sale", href: '#' },
                    { name: "Kids' Sale", href: '#' },
                    { name: 'Home Sale', href: '#' },
                    { name: 'Shoes Sale', href: '#' },
                    { name: 'Handbags Sale', href: '#' },
                    { name: 'Jewelry Sale', href: '#' }
                ]
            }
        ],
        featured: {
            title: 'Spring Forward Sale',
            image: '/placeholder.svg?height=300&width=300',
            cta: 'Shop now',
            href: '#'
        }
    }
];
