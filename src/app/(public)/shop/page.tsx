/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { CategorySlider, SingleProductCard } from '../../components';
import {
    FilterSheet,
    Pagination,
    SortDropdown,
    TrendingSlider
} from './components';
import { LoadingPublic } from '@/components';
import { IProduct } from '@/types';
import {
    useGetAllPublicProductQuery,
    useGetAllSearchProductQuery
} from '@/api/public';
import { useSearchParams } from 'next/navigation';

const ShopPage = () => {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('q') || '';

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortValue, setSortValue] = useState('');
    const [filters, setFilters] = useState('');

    // Default product fetch
    const {
        data: productData = [],
        isLoading: isDefaultLoading,
        isFetching: isDefaultFetching,
        isError: isDefaultError,
        error: defaultError
    } = useGetAllPublicProductQuery(
        {
            page: currentPage,
            limit: pageSize,
            sort: sortValue,
            filters
        },
        {
            skip: !!searchTerm // skip default fetch if search exists
        }
    ) as any;

    // Search fetch
    const {
        data: searchData = [],
        isLoading: isSearchLoading,
        isFetching: isSearchFetching,
        isError: isSearchError,
        error: searchError
    } = useGetAllSearchProductQuery(searchTerm, {
        skip: !searchTerm
    }) as any;

    console.log('searchData', searchData);

    const isLoading = searchTerm ? isSearchLoading : isDefaultLoading;
    const isFetching = searchTerm ? isSearchFetching : isDefaultFetching;
    const isError = searchTerm ? isSearchError : isDefaultError;
    const error = searchTerm ? searchError : defaultError;

    if (isLoading || isFetching) {
        return <LoadingPublic />;
    }

    if (error || isError) {
        return 'Something went wrong';
    }

    return (
        <div className='container py-6 !overflow-hidden'>
            {!searchTerm && (
                <div className='flex items-center justify-between'>
                    {/* <FilterSheet setFilters={setFilters} /> */}
                    <div className=''>
                        <h3 className='font-bold text-2xl mb-4'>
                            {searchTerm
                                ? `Results for "${searchTerm}"`
                                : 'All Shop Product'}
                        </h3>
                    </div>
                    <SortDropdown
                        sortValue={sortValue}
                        onSortChange={setSortValue}
                    />
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12'>
                {!searchData?.length
                    ? productData?.data?.map((product: IProduct) => (
                          <SingleProductCard
                              key={product?.id}
                              product={product}
                          />
                      ))
                    : searchData?.map((product: any) => (
                          <SingleProductCard
                              key={product?.id}
                              product={product}
                          />
                      ))}
            </div>

            {!searchData?.length ? (
                <div className='pt-24 pb-48 flex items-center justify-center'>
                    <p className='font-bold text-2xl'>No Product Found!!</p>
                </div>
            ) : (
                ''
            )}

            {!searchTerm && (
                <div className='mb-12'>
                    <Pagination
                        totalPages={5}
                        defaultPage={currentPage}
                        defaultPageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                    />
                </div>
            )}

            <h3 className='font-bold text-2xl mb-8'>Trending Near You</h3>
            <div className='mb-12'>
                <TrendingSlider />
            </div>
        </div>
    );
};

export default ShopPage;
