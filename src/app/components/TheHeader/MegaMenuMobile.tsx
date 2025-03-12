'use client';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { menuData } from '@/static';
import React, { FC } from 'react';

interface IProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: FC<IProps> = ({ isOpen, setIsOpen }) => {
    return (
        <div className='lg:hidden'>
            {isOpen && (
                <div className='fixed inset-0 top-16 z-50 bg-white mt-[68px] p-4 overflow-y-auto'>
                    <Accordion type='single' collapsible className='w-full'>
                        {menuData.map((category) => (
                            <AccordionItem
                                key={category.id}
                                value={category.id}
                            >
                                <AccordionTrigger className='text-lg font-medium'>
                                    {category.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {category.sections.map((section, index) => (
                                        <div key={index} className='mb-4'>
                                            <h3 className='font-bold text-sm mb-2'>
                                                {section.title}
                                            </h3>
                                            <ul className='space-y-2 pl-2'>
                                                {section.items.map(
                                                    (item, itemIndex) => (
                                                        <li key={itemIndex}>
                                                            <Link
                                                                href={item.href}
                                                                className='text-sm hover:text-primary'
                                                                onClick={() =>
                                                                    setIsOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    ))}

                                    {category.featured && (
                                        <div className='mt-4 p-4 bg-muted rounded-lg'>
                                            <h3 className='text-lg font-bold mb-2'>
                                                {category.featured.title}
                                            </h3>
                                            <Link
                                                href={category.featured.href}
                                                className='inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90'
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {category.featured.cta}
                                            </Link>
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
