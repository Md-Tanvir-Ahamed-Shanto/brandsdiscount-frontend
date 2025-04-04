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
import { useGetAllPublicProductQuery } from '@/api/public';

const ShopPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortValue, setSortValue] = useState('');
    const [filters, setFilters] = useState('');
    console.log('🚀 ~ ShopPage ~ filters:', filters);

    // Fetch products with updated parameters
    const [products, setProducts] = useState<IProduct[]>([]);
    console.log('🚀 ~ ShopPage ~ products:', products);

    const {
        data: productData,
        isLoading,
        isError,
        error
    } = useGetAllPublicProductQuery({
        page: currentPage,
        limit: pageSize,
        sort: sortValue,
        filters
    });

    // Update state when new data arrives
    useEffect(() => {
        if (productData?.data) {
            setProducts(productData.data); // Assuming productData has a `data` array
        }
    }, [productData]);

    // Log whenever page or page size changes
    useEffect(() => {
        console.log('Current Page:', currentPage);
        console.log('Page Size:', pageSize);
        console.log('Sort Value:', sortValue);
    }, [currentPage, pageSize, sortValue]);

    if (isLoading) {
        return <LoadingPublic />;
    }
    if (error || isError) {
        return 'Something went wrong';
    }
    return (
        <div className='container py-6 !overflow-hidden'>
            <h3 className='font-bold text-2xl mb-4'>Girls Cloths (740)</h3>
            <CategorySlider />
            <div className='flex items-center justify-between'>
                <FilterSheet setFilters={setFilters} />
                <SortDropdown
                    sortValue={sortValue}
                    onSortChange={setSortValue}
                />
            </div>

            {/* Products Grid */}
            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12'>
                {PRODUCTS.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div> */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12'>
                {products?.map((product: IProduct) => (
                    <SingleProductCard key={product?.id} product={product} />
                ))}
            </div>

            <div className='mb-12'>
                <Pagination
                    totalPages={5}
                    defaultPage={currentPage}
                    defaultPageSize={pageSize}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                />
            </div>

            <h3 className='font-bold text-2xl mb-8'>Trending Near You</h3>
            <div className='mb-12'>
                <TrendingSlider />
            </div>
        </div>
    );
};

export default ShopPage;
