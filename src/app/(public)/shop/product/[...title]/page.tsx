'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetSinglePublicProductQuery } from '@/api/public';
import { LoadingPublic } from '@/components';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { useGetAllProfileOrderQuery } from '@/api';
import { MyTokenPayload } from '@/app/(profile)/profile/page';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { RecentlyViewedSlider } from '../../components';
import { ProductCard } from './components/ProductCard';
import { ISingleProduct } from '@/types';
import { YouMayAlsoLikeSection } from './components';
// import { convertFromUrl } from '@/lib';
// import { PRODUCTS } from '@/static';

const SingleProductPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') as string;
    const [quantity, setQuantity] = useState(1);
    const { data: orderData, isLoading: isOrderLoading } =
        useGetAllProfileOrderQuery('');
    const { data, isLoading, isError } = useGetSinglePublicProductQuery(id);
    console.log("data ",data)
    useEffect(() => {
        if (data) {
            const existingProducts = JSON.parse(
                localStorage.getItem('recentlyViewed') || '[]'
            );
            const filteredProducts = existingProducts.filter(
                (product: ISingleProduct) => product.id !== data.id
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
    }, [orderData]);

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
                <YouMayAlsoLikeSection product={data} />
            </div>
            <div className='mt-16'>
                <RecentlyViewedSlider />
            </div>
        </div>
    );
};

export default SingleProductPage;
