import { AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Discount_Ranges } from '@/static';
import React from 'react';

interface IProps {
    selectedDiscounts: string[];
    handleDiscountChange: (checked: boolean, value: string) => void;
}
const DiscountContent = ({
    selectedDiscounts,
    handleDiscountChange
}: IProps) => {
    return (
        <AccordionContent>
            <div className='space-y-4'>
                {Discount_Ranges.map((range) => (
                    <div key={range.id} className='flex items-center space-x-2'>
                        <Checkbox
                            id={range.id}
                            checked={selectedDiscounts.includes(range.id)}
                            onCheckedChange={(checked) =>
                                handleDiscountChange(
                                    checked as boolean,
                                    range.id
                                )
                            }
                        />
                        <label
                            htmlFor={range.id}
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                            {range.label}
                        </label>
                    </div>
                ))}
            </div>
        </AccordionContent>
    );
};

export default DiscountContent;
