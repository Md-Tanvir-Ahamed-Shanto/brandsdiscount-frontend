'use client';
import { useGetMayLikeProductsQuery } from '@/api/public';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { addToCart, useAppDispatch } from '@/store';
import { IProduct, ISingleProduct } from '@/types';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface IProps {
    product: ISingleProduct;
}

const ProductDetails = ({ product }: IProps) => {
    const { data, isLoading, isError } = useGetMayLikeProductsQuery(
        product?.categoryId || ''
    );

    const dispatch = useAppDispatch();

    if (isLoading) return 'Loading...';
    if (isError) return 'Something went wrong';
    return (
        <>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='mb-12'>
                    <h1 className='text-xl font-bold mb-2'>
                        {product?.brandName}
                    </h1>
                    <p className='text-lg mb-4'>{product?.title}</p>

                    <div className='flex items-baseline gap-2 mb-4'>
                        <span className='text-2xl font-bold'>
                            ${product?.regularPrice}
                        </span>
                        <button className='text-sm text-blue-600 underline'>
                            Details
                        </button>
                    </div>

                    <div className='mb-6'>
                        <p className='mb-2'>Color: Fairfield</p>
                    </div>

                    <div className='mb-8'>
                        <div className='flex items-center gap-2 mb-4'>
                            <span>Size: Please select</span>
                            <button className='text-sm text-blue-600 underline'>
                                Size Chart
                            </button>
                        </div>

                        <Button
                            className='w-full bg-red-700 hover:bg-red-800 
                            text-white py-6'
                            onClick={() => {
                                dispatch(addToCart(product));
                                toast.success('Product added successfully');
                            }}
                        >
                            Add To Bag
                        </Button>
                    </div>
                </div>
            </div>

            <div>
                <h2 className='text-2xl font-bold mb-6'>You may also like</h2>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    {data &&
                        data?.data?.slice(0, 4)?.map((product: IProduct) => (
                            <Link
                                href={`/shop/${product?.id}`}
                                key={product.id}
                                className='group cursor-pointer'
                            >
                                <div className='relative aspect-[3/4] mb-4'>
                                    <Avatar
                                        src={
                                            product?.images[0]?.url ||
                                            '/shop/no-image.jpeg'
                                        }
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='font-medium'>
                                        {product?.brandName}
                                    </h3>
                                    <p className='text-sm text-gray-600 line-clamp-2'>
                                        {product?.title}
                                    </p>
                                    <div className='space-y-1'>
                                        <p className='font-medium'>
                                            BDT {product?.platFormPrice}
                                        </p>
                                        <p className='text-red-600'>
                                            With offer BDT {product?.salePrice}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
