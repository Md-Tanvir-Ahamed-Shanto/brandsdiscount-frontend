'use client';
import { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AdminPanel, ChangePasswordAccordion, UserProfile } from './components';

export default function Dashboard() {
    const [openAccordion, setOpenAccordion] = useState<string | undefined>(
        undefined
    );

    const handlePasswordButtonClick = () => {
        setOpenAccordion((prev) =>
            prev === 'password' ? undefined : 'password'
        );
    };

    return (
        <div className='container mx-auto py-6 space-y-8'>
            <AdminPanel />

            <UserProfile />

            <div className='w-full mx-auto'>
                <Button
                    onClick={handlePasswordButtonClick}
                    className='w-full mb-2 !bg-[#192133] text-white hover:text-white'
                    variant='outline'
                >
                    Wanna Change Password?
                </Button>

                <Accordion
                    type='single'
                    collapsible
                    value={openAccordion}
                    onValueChange={setOpenAccordion}
                    className='!bg-[#192133] text-white'
                >
                    <AccordionItem
                        value='password'
                        className='border rounded-lg'
                    >
                        <AccordionContent className='pt-2'>
                            <ChangePasswordAccordion />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
