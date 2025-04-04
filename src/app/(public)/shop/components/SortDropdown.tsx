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

interface SortDropdownProps {
    sortValue: string;
    onSortChange: (value: string) => void;
}

const SortDropdown = ({ sortValue, onSortChange }: SortDropdownProps) => {
    return (
        <div className='w-[240px]'>
            <Select onValueChange={onSortChange} value={sortValue}>
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
