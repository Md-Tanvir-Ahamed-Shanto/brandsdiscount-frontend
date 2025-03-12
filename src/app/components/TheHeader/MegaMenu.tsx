'use client';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { menuData } from '@/static';
import { bottomBorder } from '@/lib';

export function MegaMenu() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMouseEnter = (categoryId: string) => {
        setActiveCategory(categoryId);
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setIsMenuOpen(false);
    };

    const activeMenu = menuData.find(
        (category) => category.id === activeCategory
    );

    return (
        <nav
            className='relative border-b hidden lg:block'
            onMouseLeave={handleMouseLeave}
        >
            <div className='container'>
                <ul className='flex justify-between'>
                    {menuData.map((category) => (
                        <li
                            key={category.id}
                            className='relative py-4'
                            onMouseEnter={() => handleMouseEnter(category.id)}
                        >
                            <Link
                                href='#'
                                className={cn(
                                    'flex items-center gap-1 px-2 py-1 font-medium hover:text-primary transition-colors group',
                                    activeCategory === category.id && isMenuOpen
                                        ? 'text-primary border-primary'
                                        : ''
                                )}
                            >
                                {category.title}
                                <div
                                    className={`absolute bottom-0 ${bottomBorder(category.id)} w-12 h-[2px] bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                ></div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mega Menu Dropdown */}
            {isMenuOpen && activeMenu && (
                <div className='absolute left-0 w-full bg-white shadow-lg border-t z-50 animate-in fade-in duration-200'>
                    <div className='container py-6 grid grid-cols-4 gap-8'>
                        {activeMenu.sections.map((section, index) => (
                            <div key={index} className='space-y-4'>
                                <h3 className='font-bold text-sm'>
                                    {section.title}
                                </h3>
                                <ul className='space-y-2'>
                                    {section.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <Link
                                                href={item.href}
                                                className='text-sm hover:text-primary hover:underline'
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {activeMenu.featured && (
                            <div className='col-span-1'>
                                <div className='space-y-2'>
                                    <h3 className='text-2xl font-bold'>
                                        {activeMenu.featured.title}
                                    </h3>
                                    <Link
                                        href={activeMenu.featured.href}
                                        className='inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90'
                                    >
                                        {activeMenu.featured.cta}
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
