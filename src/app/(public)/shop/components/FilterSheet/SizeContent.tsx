/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllSizesQuery } from '@/api';
import { AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';

interface IProps {
    setFilters: React.Dispatch<React.SetStateAction<string>>;
}

const SizeContent: React.FC<IProps> = ({ setFilters }) => {
    const { data, isLoading } = useGetAllSizesQuery('');

    const handleSizeClick = (sizeId: string) => {
        setFilters((prev) => `sizeId_${sizeId}`);
    };

    return (
        <AccordionContent>
            <div className='grid grid-cols-3 gap-2'>
                {isLoading ? (
                    <p>Loading sizes...</p>
                ) : (
                    data?.data?.map((size: any) => (
                        <Button
                            key={size.id}
                            variant='outline'
                            onClick={() => handleSizeClick(size.id)}
                            className='w-full'
                        >
                            {size.name}
                        </Button>
                    ))
                )}
            </div>
        </AccordionContent>
    );
};

export default SizeContent;
