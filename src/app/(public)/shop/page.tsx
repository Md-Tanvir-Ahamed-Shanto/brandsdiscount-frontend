'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
// Components: Ensure paths are correct for your project structure
import { SingleProductCard } from '../../components'; 
import {
    Pagination,
    ProductSkeleton,
    SortDropdown,
    TrendingSlider
} from './components';
import SizeFilterSheet from './components/SizeFilter';

// Types and API
import { IProduct } from '@/types';
import {
    useGetAllPublicProductQuery,
    useGetAllSearchProductQuery
} from '@/api/public';

/**
 * The main shop page component handles product display, searching, filtering,
 * sorting, and pagination using RTK Query.
 */
const ShopPage = () => {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    // Consolidate all filtering parameters from the URL
    const filters = searchParams.get('filter') || '';
    
    // --- Local State Management ---
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [sortValue, setSortValue] = useState('');
    
    // State for initial filter sheet display (UX improvement)
    const [showInitialFilterSheet, setShowInitialFilterSheet] = useState(false);
    
    // --- Side Effect: Initial Visit Check for Filter Sheet ---
    // Show the filter sheet only on the very first visit for better discoverability
    useEffect(() => {
        // Use a simple boolean flag in localStorage to track the first visit
        const visited = localStorage.getItem('has_visited_shop');
        if (!visited) {
            setShowInitialFilterSheet(true);
            localStorage.setItem('has_visited_shop', 'true');
        }
    }, []);
    
    // --- RTK Query Logic ---

    // Determine the query parameters based on the current state
    const queryParams = useMemo(() => ({
        page: currentPage,
        limit: pageSize,
        sort: sortValue,
        // Pass filters parameter to the API. It should be parsed on the backend.
        filters: `filtering=${filters}`, 
    }), [currentPage, pageSize, sortValue, filters]);

    // Query for general products (runs when no search term is present)
    const {
        data: productData,
        isLoading: isDefaultLoading,
        isFetching: isDefaultFetching,
        isError: isDefaultError,
        error: defaultError,
        refetch: refetchProducts
    } = useGetAllPublicProductQuery(queryParams, {
        skip: !!searchTerm,
        refetchOnMountOrArgChange: true
    }) as any;
    
    // Query for search results (runs only when a search term is present)
    const {
        data: searchData,
        isLoading: isSearchLoading,
        isFetching: isSearchFetching,
        isError: isSearchError,
        error: searchError,
        refetch: refetchSearch
    } = useGetAllSearchProductQuery(
        { searchTerm, limit: pageSize, page: currentPage },
        { 
            skip: !searchTerm,
            refetchOnMountOrArgChange: true
        }
    ) as any;

    // --- Data Aggregation ---
    const isSearchMode = !!searchTerm;
    const isLoading = isSearchMode ? isSearchLoading : isDefaultLoading;
    const isFetching = isSearchMode ? isSearchFetching : isDefaultFetching;
    const isError = isSearchMode ? isSearchError : isDefaultError;
    const error = isSearchMode ? searchError : defaultError;
    
    // Safely extract data and meta info
    const currentData = isSearchMode ? searchData : productData;
    const products: IProduct[] = currentData?.products || [];
    const totalPages: number = currentData?.totalPages || 1;
    const totalItems: number = currentData?.totalItems || 0;

    // --- Side Effect: Reset Pagination on Filter/Search/Sort Change ---
    // Resets page to 1 whenever the query context changes (search, filters, sort)
    useEffect(() => {
        // Only reset if the current page isn't already 1
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, filters, sortValue, pageSize]); // pageSize is included here to handle the reset case

    // --- Callback Handlers ---
    
    /** Handles page number change. */
    const handlePageChange = useCallback((page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            // Smoothly scroll to the top of the product list container for better UX
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Immediately trigger refetch with new page
            setTimeout(() => {
                if (isSearchMode && refetchSearch) {
                    refetchSearch();
                } else if (!isSearchMode && refetchProducts) {
                    refetchProducts();
                }
            }, 0);
        }
    }, [currentPage, totalPages, isSearchMode, refetchSearch, refetchProducts]);
    
    /** Handles items-per-page change. */
    const handlePageSizeChange = useCallback((size: number) => {
        if (size !== pageSize) {
            setPageSize(size);
            // Immediately trigger refetch with new page size
            setTimeout(() => {
                if (isSearchMode && refetchSearch) {
                    refetchSearch();
                } else if (!isSearchMode && refetchProducts) {
                    refetchProducts();
                }
            }, 0);
        }
    }, [pageSize, isSearchMode, refetchSearch, refetchProducts]);
    
    /** Handles product sort change. */
    const handleSortChange = useCallback((value: string) => {
        if (value !== sortValue) {
            setSortValue(value);
            // Page reset logic is now handled in the useEffect above for cleaner flow.
        }
    }, [sortValue]);

    // --- Render Logic ---
    const showSkeleton = isLoading || isFetching;
    const hasProducts = products.length > 0;

    // --- Error State Component ---
    if (isError && error) {
        return (
            <div className="container min-h-[60vh] flex items-center justify-center py-10">
                <div className="text-center max-w-md p-6 border rounded-lg shadow-lg bg-card">
                    <svg
                        className="w-16 h-16 mx-auto text-red-500 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <h3 className="text-2xl font-bold text-destructive mb-2">Service Temporarily Unavailable</h3>
                    <p className="text-muted-foreground mb-4">
                        We're having trouble loading the products. This is often a network or server issue.
                    </p>
                    <p className="text-xs text-muted-foreground mb-6">
                        {error?.status ? `Error ${error.status}: ${error.data?.message || 'Unknown server response'}` : 'A network connection error occurred.'}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    // --- Main Content ---
    return (
        <div className='container py-8'>
            {/* Size Filter Sheet (only shows initially if it's the first visit) */}
            <SizeFilterSheet showInitially={showInitialFilterSheet} />
            
            {/* Product Header & Controls */}
            <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b pb-4'>
                <div className="flex flex-col">
                    <h1 className='font-extrabold text-4xl tracking-tight text-foreground'>
                        {isSearchMode ? `Search Results` : 'The Shop'}
                    </h1>
                    
                    {searchTerm && (
                        <p className='text-md text-muted-foreground mt-1'>
                            Displaying results for <span className='font-semibold text-primary'>"{searchTerm}"</span>
                        </p>
                    )}

                    {!showSkeleton && (
                         <p className='text-sm text-muted-foreground mt-1'>
                            {totalItems > 0 
                                ? `${totalItems.toLocaleString()} ${totalItems === 1 ? 'product' : 'products'} available`
                                : 'Filter for new items'}
                        </p>
                    )}
                </div>

                <SortDropdown
                    sortValue={sortValue}
                    onSortChange={handleSortChange}
                />
            </div>

            {/* Product Display Area */}
            {/* Loading Skeleton */}
            {showSkeleton && <ProductSkeleton />}

            {/* Products Grid */}
            {!showSkeleton && hasProducts && (
                <>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-4'>
                        {products.map((product: IProduct) => (
                            <SingleProductCard
                                key={product?.id}
                                product={product}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className='mt-12 mb-8'>
                        <Pagination
                            totalItems={totalItems}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    </div>
                </>
            )}

            {/* No Products Found */}
            {!showSkeleton && !hasProducts && (
                <div className='min-h-[50vh] flex flex-col items-center justify-center py-20'>
                    <div className='text-center max-w-lg p-6 border rounded-lg bg-card shadow-sm'>
                        <svg 
                            className="w-20 h-20 mx-auto text-muted-foreground/50 mb-6"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                            />
                        </svg>
                        <h3 className='font-bold text-2xl mb-3'>No Products Found</h3>
                        <p className='text-muted-foreground mb-6'>
                            {searchTerm 
                                ? `We couldn't find any items matching your search for "${searchTerm}". Try broadening your search or checking your filters.`
                                : 'It looks like there are no products currently matching your selected filters.'}
                        </p>
                        <button
                            onClick={() => window.location.href = '/shop'}
                            className='px-8 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md'
                        >
                            Reset Filters & Browse All
                        </button>
                    </div>
                </div>
            )}

            {/* Trending Section - Moved outside conditional rendering for consistent placement */}
            {!showSkeleton && (
                <div className='mt-20 mb-8'>
                    <h2 className='font-bold text-3xl mb-8 border-b pb-2'>Recommended For You</h2>
                    <TrendingSlider />
                </div>
            )}
        </div>
    );
};

export default ShopPage;