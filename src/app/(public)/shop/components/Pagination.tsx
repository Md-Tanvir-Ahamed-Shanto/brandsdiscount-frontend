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
import { cn } from '@/lib/utils';

interface PaginationProps {
    totalPages?: number;
    defaultPage?: number;
    defaultPageSize?: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

const Pagination = ({
    totalPages = 7,
    defaultPage = 1,
    defaultPageSize = 30,
    onPageChange,
    onPageSizeChange
}: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const handlePageSizeChange = (size: number) => {
        console.log('Pagination: changing page size to', size);
        setPageSize(size);
        onPageSizeChange(size); // Update in parent
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            onPageChange(page); // Update in parent
        }
    };

    // Calculate visible page numbers for pagination
    const getVisiblePages = () => {
        const delta = 2; // Number of pages to show before and after current page
        const pages = [];
        
        // Always include first page
        pages.push(1);
        
        // Calculate range around current page
        const rangeStart = Math.max(2, currentPage - delta);
        const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
        
        // Add ellipsis after first page if needed
        if (rangeStart > 2) {
            pages.push('ellipsis1');
        }
        
        // Add pages in range
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }
        
        // Add ellipsis before last page if needed
        if (rangeEnd < totalPages - 1) {
            pages.push('ellipsis2');
        }
        
        // Always include last page if not already included
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 w-full'>
            {/* Items per page selector */}
            <div className='flex items-center gap-2'>
                <span className='text-sm font-medium'>Show</span>
                <div className='flex gap-1 rounded-md overflow-hidden border'>
                    <Button
                        variant={pageSize === 30 ? 'default' : 'ghost'}
                        size='sm'
                        onClick={() => handlePageSizeChange(30)}
                        className='rounded-none h-8 px-3'
                    >
                        30
                    </Button>
                    <Button
                        variant={pageSize === 60 ? 'default' : 'ghost'}
                        size='sm'
                        onClick={() => handlePageSizeChange(60)}
                        className='rounded-none h-8 px-3'
                    >
                        60
                    </Button>
                    <Button
                        variant={pageSize === 120 ? 'default' : 'ghost'}
                        size='sm'
                        onClick={() => handlePageSizeChange(120)}
                        className='rounded-none h-8 px-3'
                    >
                        120
                    </Button>
                </div>
            </div>

            {/* Page navigation */}
            <div className='flex items-center gap-1'>
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='h-8 w-8 rounded-full'
                    aria-label="Previous page"
                >
                    <ChevronLeft className='h-4 w-4' />
                </Button>

                <div className='flex items-center'>
                    {visiblePages.map((page, index) => {
                        if (page === 'ellipsis1' || page === 'ellipsis2') {
                            return (
                                <span key={`${page}-${index}`} className='px-2'>
                                    &hellip;
                                </span>
                            );
                        }
                        
                        return (
                            <Button
                                key={`page-${page}`}
                                variant={currentPage === page ? 'default' : 'ghost'}
                                size='sm'
                                onClick={() => handlePageChange(Number(page))}
                                className={cn(
                                    'h-8 w-8 p-0 rounded-full font-medium',
                                    currentPage === page ? 'bg-primary text-primary-foreground' : ''
                                )}
                            >
                                {page}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='h-8 w-8 rounded-full'
                    aria-label="Next page"
                >
                    <ChevronRight className='h-4 w-4' />
                </Button>
            </div>

            {/* Mobile dropdown for smaller screens */}
            <div className='sm:hidden w-full flex justify-center mt-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='w-full max-w-[200px]'>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <ChevronDown className='ml-2 h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='center' className='w-full max-h-[300px] overflow-y-auto'>
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((page) => (
                            <DropdownMenuItem
                                key={page}
                                onSelect={() => handlePageChange(page)}
                                className={cn(
                                    'cursor-pointer justify-center',
                                    currentPage === page ? 'bg-muted' : ''
                                )}
                            >
                                Page {page} of {totalPages}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Pagination;
