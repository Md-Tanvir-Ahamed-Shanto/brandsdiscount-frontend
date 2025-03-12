import { AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { SIZE_OPTIONS } from '@/static';
import React from 'react';

const SizeContent: React.FC<{ handleSizeClick: (size: string) => void }> = ({
    handleSizeClick
}) => {
    return (
        <AccordionContent>
            <div className='grid grid-cols-3 gap-2'>
                {SIZE_OPTIONS.map((size) => (
                    <Button
                        key={size}
                        variant='outline'
                        onClick={() => handleSizeClick(size)}
                        className='w-full'
                    >
                        {size}
                    </Button>
                ))}
            </div>
        </AccordionContent>
    );
};

export default SizeContent;
