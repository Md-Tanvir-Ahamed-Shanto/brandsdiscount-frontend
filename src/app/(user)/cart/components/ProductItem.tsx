/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    useAppDispatch
} from '@/store';
import Image from 'next/image';
import toast from 'react-hot-toast';

const ProductItem = ({ product }: any) => {
    const dispatch = useAppDispatch();
    return (
        <div className='py-6 flex flex-col sm:flex-row gap-4'>
            <div className='sm:w-32 flex-shrink-0'>
                <Image
                    src={
                        product?.images[0]?.url || '/single-product/single.webp'
                    }
                    alt={product?.title}
                    width={120}
                    height={150}
                    className='w-full object-cover'
                />
            </div>

            <div className='flex-1'>
                <h3 className='font-medium'>{product?.brand}</h3>
                <p className='text-sm mb-2'>{product?.title}</p>

                <div className='text-sm space-y-1 mb-3'>
                    <p>Size: {product?.sizeType || ''}</p>
                    <p>Color: {product?.color}</p>
                    <p>SKU: {product?.sku}</p>
                </div>

                <button
                    className='text-sm underline mb-3'
                    onClick={() => {
                        dispatch(removeFromCart(product.id));
                        toast.success('product removed successfully');
                    }}
                >
                    Remove
                </button>
            </div>

            <div className='sm:w-48 flex-shrink-0'>
                <div className='flex flex-col items-end'>
                    <div className='flex items-center mb-4'>
                        <span className='mr-2'>Qty</span>
                        <div className='flex border rounded-md'>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-10 w-10 rounded-r-none'
                                onClick={() =>
                                    dispatch(decrementQuantity(product.id))
                                }
                            >
                                −
                            </Button>
                            <div className='flex items-center justify-center w-10 h-10 border-x'>
                                {product?.quantity}
                            </div>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-10 w-10 rounded-l-none'
                                onClick={() =>
                                    dispatch(incrementQuantity(product.id))
                                }
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    <div className='text-right'>
                        <div className='flex flex-col items-end'>
                            <span className='text-sm line-through'>
                                ${product?.regularPrice}
                            </span>
                        </div>
                        <span className='font-medium'>
                            ${product?.salePrice}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
