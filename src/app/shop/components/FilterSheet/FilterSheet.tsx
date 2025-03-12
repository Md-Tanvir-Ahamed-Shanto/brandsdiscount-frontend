'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components';
import TypeContent from './TypeContent';
import DiscountContent from './DiscountContent';
import { BRANDS } from '@/static';
import BrandContent from './BrandContent';
import SizeContent from './SizeContent';

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

const FilterSheet = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
    const [brandSearch, setBrandSearch] = useState('');
    const [filteredBrands, setFilteredBrands] = useState(BRANDS.slice(0, 3));
    const [open, setOpen] = useState(false);

    const debouncedSearchTerm = useDebounce(brandSearch, 300);

    useEffect(() => {
        console.log('Searching brands with:', debouncedSearchTerm);
        const filtered = BRANDS.filter((brand) =>
            brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        ).slice(0, 3); // Show max 3 results
        setFilteredBrands(filtered);
    }, [debouncedSearchTerm]);

    const handleTypeChange = (checked: boolean, value: string) => {
        if (checked) {
            setSelectedTypes([...selectedTypes, value]);
        } else {
            setSelectedTypes(selectedTypes.filter((type) => type !== value));
        }
        console.log('Selected types:', selectedTypes);
    };

    const handleDiscountChange = (checked: boolean, value: string) => {
        if (checked) {
            setSelectedDiscounts([...selectedDiscounts, value]);
        } else {
            setSelectedDiscounts(
                selectedDiscounts.filter((discount) => discount !== value)
            );
        }
        console.log('Selected discount ranges:', selectedDiscounts);
    };

    const handleSizeClick = (size: string) => {
        console.log('Selected size:', size);
    };

    const handleClear = () => {
        setSelectedTypes([]);
        setSelectedDiscounts([]);
        setBrandSearch('');
        console.log('Cleared all filters');
    };

    const handleView = () => {
        console.log('View results with current filters:', {
            types: selectedTypes,
            discounts: selectedDiscounts,
            brandSearch
        });
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant='outline' className='flex items-center gap-2'>
                    <Icons.SlidersHorizontal /> All Filters
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full sm:max-w-md filterSheet'>
                <SheetHeader>
                    <SheetTitle className='flex justify-between items-center'>
                        Filters
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => setOpen(false)}
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </SheetTitle>
                </SheetHeader>

                <div className='mt-8'>
                    <Accordion type='single' collapsible className='w-full'>
                        {/* Type Accordion */}
                        <AccordionItem value='type'>
                            <AccordionTrigger className='!text-lg !border-b-0'>
                                Item Type
                            </AccordionTrigger>
                            <TypeContent
                                selectedTypes={selectedTypes}
                                handleTypeChange={handleTypeChange}
                            />
                        </AccordionItem>

                        {/* Discount Range Accordion */}
                        <AccordionItem value='discount'>
                            <AccordionTrigger className='!text-lg'>
                                Discount Range
                            </AccordionTrigger>
                            <DiscountContent
                                selectedDiscounts={selectedDiscounts}
                                handleDiscountChange={handleDiscountChange}
                            />
                        </AccordionItem>

                        {/* Brand Accordion */}
                        <AccordionItem value='brand'>
                            <AccordionTrigger className='!text-lg'>
                                Brand
                            </AccordionTrigger>
                            <BrandContent
                                brandSearch={brandSearch}
                                setBrandSearch={setBrandSearch}
                                filteredBrands={filteredBrands}
                            />
                        </AccordionItem>

                        {/* Size Accordion */}
                        <AccordionItem value='size'>
                            <AccordionTrigger className='!text-lg'>
                                Size
                            </AccordionTrigger>
                            <SizeContent handleSizeClick={handleSizeClick} />
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className='absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-2'>
                    <Button
                        variant='outline'
                        className='flex-1'
                        onClick={handleClear}
                    >
                        Clear All
                    </Button>
                    <Button className='flex-1' onClick={handleView}>
                        View Items
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default FilterSheet;
