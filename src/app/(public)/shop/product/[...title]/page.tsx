'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { AdditionalInformation, AuthModal, ProductImage } from './components';
import { useSearchParams } from 'next/navigation';
import { useGetSinglePublicProductQuery } from '@/api/public';
import { LoadingPublic } from '@/components';
import { ISingleProduct } from '@/types';
import clsx from 'clsx';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { MdBookOnline, MdClose, MdKeyboardArrowDown } from 'react-icons/md';
import { selectCartSavings } from '@/store';
import { useAppSelector } from '@/store';
import { useGetAllProfileOrderQuery } from '@/api';
import { MyTokenPayload } from '@/app/(profile)/profile/page';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Modal } from '@/components/core';
import { sizeChartMap } from '@/static';
import { TrendingSlider } from '../../components';
import { ProductCard } from './components/ProductCard';
// import { convertFromUrl } from '@/lib';
// import { PRODUCTS } from '@/static';

const SingleProductPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') as string;
    const [quantity, setQuantity] = useState(1);
    const { data: orderData, isLoading: isOrderLoading } =
        useGetAllProfileOrderQuery('');
    const { data, isLoading, isError } = useGetSinglePublicProductQuery(id);
    useEffect(() => {
        if (data) {
            const existingProducts = JSON.parse(
                localStorage.getItem('recentlyViewed') || '[]'
            );
            const filteredProducts = existingProducts.filter(
                (product: any) => product.id !== data.id
            );
            const updatedProducts = [data, ...filteredProducts].slice(0, 10);
            localStorage.setItem(
                'recentlyViewed',
                JSON.stringify(updatedProducts)
            );
        }
    }, [data]);

    const isAllowedForFirstItemDiscount = useMemo(() => {
        const cookie = Cookies.get('token');
        if (!cookie) return true;
        const userId = jwtDecode<MyTokenPayload>(cookie).id;
        if (!userId) return true;
        if (!orderData) return true;
        return orderData?.length === 0;
    }, [isOrderLoading, orderData]);

    if (isLoading || isOrderLoading) return <LoadingPublic />;
    if (isError || !data)
        return (
            <p className='text-center py-48 font-bold text-3xl'>
                Product not found.
            </p>
        );

    return (
        <div>
            {isAllowedForFirstItemDiscount && (
                <ProgressBar
                    targetSpend={60}
                    initialTimeInSeconds={3599}
                    onTimeExpire={() => {}}
                    className={''}
                />
            )}
            <ProductCard
                product={data}
                quantity={quantity}
                setQuantity={setQuantity}
                isAllowedForFirstItemDiscount={isAllowedForFirstItemDiscount}
            />
            <div className='container mx-auto'>
                <h3 className='font-bold text-2xl mb-8'>Trending Near You</h3>
                <div className='mb-12'>
                    <TrendingSlider />
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
