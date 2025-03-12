'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface PaginationProps {
    totalPages?: number;
    defaultPage?: number;
    defaultPageSize?: number;
}

const Pagination = ({
    totalPages = 7,
    defaultPage = 1,
    defaultPageSize = 60
}: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        console.log('Items per page changed to:', size);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            console.log('Page changed to:', page);
        }
    };

    return (
        <div className='flex items-center justify-between'>
            {/* Items per page selector */}
            <div className='flex items-center gap-2'>
                <span className='text-sm'>Show</span>
                <div className='flex gap-1'>
                    <Button
                        variant={pageSize === 60 ? 'secondary' : 'outline'}
                        size='sm'
                        onClick={() => handlePageSizeChange(60)}
                    >
                        60
                    </Button>
                    <Button
                        variant={pageSize === 120 ? 'secondary' : 'outline'}
                        size='sm'
                        onClick={() => handlePageSizeChange(120)}
                    >
                        120
                    </Button>
                </div>
            </div>

            {/* Page navigation */}
            <div className='flex items-center gap-2'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className='h-4 w-4' />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='min-w-[120px]'>
                            <span>
                                {currentPage} of {totalPages}
                            </span>
                            <ChevronDown className='ml-2 h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((page) => (
                            <DropdownMenuItem
                                key={page}
                                onSelect={() => handlePageChange(page)}
                                className='cursor-pointer'
                            >
                                {page} of {totalPages}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
