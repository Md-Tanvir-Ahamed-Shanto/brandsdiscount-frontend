'use client';
import { useState } from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

// Define our location and currency data
const locations = [
    { country: 'Japan', currency: 'Yen', code: 'JPY' },
    { country: 'Australia', currency: 'Australian Dollar', code: 'AUD' },
    { country: 'United Kingdom', currency: 'British Pound', code: 'GBP' },
    { country: 'Canada', currency: 'Canadian Dollar', code: 'CAD' },
    { country: 'Germany', currency: 'Euro', code: 'EUR' },
    { country: 'Singapore', currency: 'Singapore Dollar', code: 'SGD' },
    { country: 'South Korea', currency: 'Won', code: 'KRW' },
    { country: 'Brazil', currency: 'Real', code: 'BRL' },
    { country: 'India', currency: 'Rupee', code: 'INR' },
    { country: 'United Arab Emirates', currency: 'Dirham', code: 'AED' }
];

const InternationalShipping = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');

    const handleSave = () => {
        console.log({
            location: selectedLocation,
            currency: selectedCurrency
        });
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className='flex items-center justify-center z-50'>
            <div className='w-full'>
                <div className='space-y-6'>
                    {/* Header */}
                    <div className='flex justify-between items-center'>
                        <h2 className='text-2xl font-bold'>
                            International Shipping
                        </h2>
                    </div>

                    {/* Description */}
                    <p className='text-base'>
                        Macys ships to over 200 locations worldwide through our
                        international service provider, Borderfree.*
                    </p>

                    {/* Location Selector */}
                    <div className='space-y-2'>
                        <label className='text-sm text-gray-600'>
                            Choose your location
                        </label>
                        <Select onValueChange={setSelectedLocation}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Select a location' />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map((loc) => (
                                    <SelectItem
                                        key={loc.country}
                                        value={loc.country}
                                    >
                                        {loc.country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Currency Selector */}
                    <div className='space-y-2'>
                        <label className='text-sm text-gray-600'>
                            Choose your currency
                        </label>
                        <Select onValueChange={setSelectedCurrency}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Select a currency' />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map((loc) => (
                                    <SelectItem key={loc.code} value={loc.code}>
                                        {loc.currency} ({loc.code})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Save Button */}
                    <Button
                        className='w-full'
                        variant='default'
                        onClick={handleSave}
                        disabled={!selectedLocation || !selectedCurrency}
                    >
                        Save & Continue
                    </Button>

                    {/* Info Section */}
                    <div className='space-y-4'>
                        <h3 className='font-bold text-base'>
                            Shipping and Transaction Info
                        </h3>
                        <p className='text-sm'>
                            *When you place an international order, your
                            transaction will be with Borderfree, but if you have
                            questions please contact Macys Customer Service at
                            1-800-289-6229.
                        </p>
                        <p className='text-sm'>
                            Orders shipped to the United States must have a U.S.
                            credit card billing address to be placed online.
                        </p>
                        <p className='text-sm'>
                            Select items are excluded from international
                            shipping. International order totals canot exceed
                            $10,000 USD. For more details, see{' '}
                            <Link
                                href='#'
                                className='underline text-black font-medium'
                            >
                                Shipping Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternationalShipping;
