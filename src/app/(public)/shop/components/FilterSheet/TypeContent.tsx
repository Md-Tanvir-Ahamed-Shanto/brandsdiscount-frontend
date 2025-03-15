import { AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { TYPE_OPTIONS } from '@/static';
import React from 'react';

interface IProps {
    selectedTypes: string[];
    handleTypeChange: (checked: boolean, value: string) => void;
}
const TypeContent = ({ selectedTypes, handleTypeChange }: IProps) => {
    return (
        <AccordionContent>
            <div className='space-y-4'>
                {TYPE_OPTIONS.map((option) => (
                    <div
                        key={option.id}
                        className='flex items-center space-x-2'
                    >
                        <Checkbox
                            id={option.id}
                            checked={selectedTypes.includes(option.id)}
                            onCheckedChange={(checked) =>
                                handleTypeChange(checked as boolean, option.id)
                            }
                        />
                        <label
                            htmlFor={option.id}
                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </AccordionContent>
    );
};

export default TypeContent;
