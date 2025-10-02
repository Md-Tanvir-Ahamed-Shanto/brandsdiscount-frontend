'use client';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Assuming Dropdown components are from a standard library like Shadcn/ui
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils'; // Utility for conditional class joining

// --- Configuration ---
const PAGE_SIZE_OPTIONS = [30, 60, 120]; // Page size options shown in the UI
const MAX_PAGES_AROUND_CURRENT = 2; // Pages to show before and after current

interface PaginationProps {
    /** Total number of items in the collection. Required for accurate totalPages calculation. */
    totalItems: number; 
    /** Current active page number (1-indexed). */
    currentPage: number;
    /** Current number of items per page. */
    pageSize: number; 
    /** Callback for when the page number changes. */
    onPageChange: (page: number) => void;
    /** Callback for when the page size changes. */
    onPageSizeChange: (size: number) => void;
}

const Pagination = ({
    totalItems,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange
}: PaginationProps) => {

    // Calculate total pages based on items and size. Fallback to 1 if totalItems is 0.
    const totalPages = useMemo(() => {
        if (totalItems <= 0 || pageSize <= 0) return 1;
        return Math.ceil(totalItems / pageSize);
    }, [totalItems, pageSize]);


    /**
     * Handles changing the page size. Resets to page 1.
     */
    const handlePageSizeChange = (newSize: number) => {
        if (newSize !== pageSize) {
            onPageSizeChange(newSize); // Update size in parent first
            // Small delay to ensure size change is processed before page change
            setTimeout(() => {
                onPageChange(1); // Reset to page 1 in parent
            }, 50);
        }
    };

    /**
     * Handles changing the page number.
     */
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            // Scroll to top for better UX on page change
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onPageChange(page); 
        }
    };
    
    /**
     * Generates a list of visible page numbers/ellipses.
     */
    const getVisiblePages = () => {
        const pages: (number | 'ellipsis')[] = [];
        const startPage = Math.max(2, currentPage - MAX_PAGES_AROUND_CURRENT);
        const endPage = Math.min(totalPages - 1, currentPage + MAX_PAGES_AROUND_CURRENT);
        
        pages.push(1); // Always include the first page
        
        // Add first ellipsis
        if (startPage > 2) {
            pages.push('ellipsis');
        }
        
        // Add pages in range
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        // Add second ellipsis
        if (endPage < totalPages - 1) {
            // Only push if the last page isn't already directly next to the range
            if (endPage < totalPages - 2 || currentPage + MAX_PAGES_AROUND_CURRENT < totalPages - 1) {
                 pages.push('ellipsis');
            }
        }
        
        // Always include last page (if not page 1)
        if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        // Clean up duplicates if the range overlaps 1 or totalPages
        return Array.from(new Set(pages));
    };

    const visiblePages = getVisiblePages();

    // Calculate item range display
    const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 w-full p-4 border-t'>
            
            {/* Left Section: Item Count and Page Size Selector */}
            <div className='flex items-center gap-4'>
                <span className='text-sm text-muted-foreground'>
                    Showing <span className="font-semibold text-foreground">{startItem}-{endItem}</span> of <span className="font-semibold text-foreground">{totalItems}</span> items
                </span>
                
                <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium whitespace-nowrap'>Items per page:</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='sm' className='h-8 px-3 transition-colors'>
                                {pageSize} <ChevronDown className='ml-2 h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start'>
                            {PAGE_SIZE_OPTIONS.map((size) => (
                                <DropdownMenuItem
                                    key={size}
                                    onSelect={() => handlePageSizeChange(size)}
                                    className={cn(
                                        'cursor-pointer',
                                        pageSize === size ? 'bg-primary/10 font-medium' : ''
                                    )}
                                >
                                    {size}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Right Section: Page Navigation */}
            <div className='flex items-center gap-2'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='h-8 w-8 rounded-full transition-colors hover:bg-primary/10'
                    aria-label="Previous page"
                >
                    <ChevronLeft className='h-4 w-4' />
                </Button>

                <div className='flex items-center gap-1'>
                    {visiblePages.map((page, index) => {
                        if (page === 'ellipsis') {
                            return (
                                <span key={`ellipsis-${index}`} className='px-1 text-muted-foreground' aria-hidden="true">
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
                                disabled={currentPage === page}
                                className={cn(
                                    'h-8 w-8 p-0 rounded-full font-medium transition-colors',
                                    currentPage === page 
                                        ? 'bg-primary text-primary-foreground shadow-sm' 
                                        : 'hover:bg-primary/10'
                                )}
                                aria-current={currentPage === page ? 'page' : undefined}
                                aria-label={`Go to page ${page}`}
                            >
                                {page}
                            </Button>
                        );
                    })}
                </div>

                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='h-8 w-8 rounded-full transition-colors hover:bg-primary/10'
                    aria-label="Next page"
                >
                    <ChevronRight className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
};

export default Pagination;