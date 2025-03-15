'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { sortOptions } from '@/static';

const SortDropdown = () => {
    const handleValueChange = (value: string) => {
        console.log('Selected sort option:', value);
        // You can also log the label if needed
        const selectedOption = sortOptions.find(
            (option) => option.value === value
        );
        console.log('Selected option label:', selectedOption?.label);
    };

    return (
        <div className='w-[240px]'>
            <Select onValueChange={handleValueChange} defaultValue='featured'>
                <SelectTrigger className='w-full bg-white border-gray-200'>
                    <div className='flex items-center gap-2'>
                        <span className='text-sm'>Sort by</span>
                        <SelectValue />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {sortOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className='cursor-pointer'
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SortDropdown;
