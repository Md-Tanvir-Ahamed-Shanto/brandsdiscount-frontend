import { AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import React from 'react';

interface IProps {
    brandSearch: string;
    setBrandSearch: React.Dispatch<React.SetStateAction<string>>;
    filteredBrands: string[];
}

const BrandContent = ({
    brandSearch,
    setBrandSearch,
    filteredBrands
}: IProps) => {
    return (
        <AccordionContent>
            <Input
                type='search'
                placeholder='Search brands...'
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className='mb-4'
            />
            <div className='space-y-2'>
                {filteredBrands.map((brand) => (
                    <div key={brand} className='text-sm'>
                        {brand}
                    </div>
                ))}
            </div>
        </AccordionContent>
    );
};

export default BrandContent;
