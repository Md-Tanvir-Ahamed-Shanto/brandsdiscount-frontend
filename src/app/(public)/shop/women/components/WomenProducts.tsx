/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { SingleProductCard } from '../../../../components';
import { Pagination, ProductSkeleton, SortDropdown } from '../../components';
import { IProduct } from '@/types';
import { useGetAllSearchProductQuery } from '@/api/public';

const WomenProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortValue, setSortValue] = useState('');

    const {
        data: searchData = [],
        isLoading,
        isError,
        error
    } = useGetAllSearchProductQuery('women') as any;

    if (error || isError) {
        return 'Something went wrong';
    }

    return (
        <div className='container py-6 !overflow-hidden'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h3 className='font-bold text-2xl mb-4'>Women's Product</h3>
                </div>
                <SortDropdown
                    sortValue={sortValue}
                    onSortChange={setSortValue}
                />
            </div>

            {isLoading && <ProductSkeleton />}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12'>
                {searchData?.length
                    ? searchData?.map((product: IProduct) => (
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

            <div className='mb-12'>
                <Pagination
                    totalPages={100}
                    defaultPage={currentPage}
                    defaultPageSize={pageSize}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                />
            </div>
        </div>
    );
};

export { WomenProducts };
