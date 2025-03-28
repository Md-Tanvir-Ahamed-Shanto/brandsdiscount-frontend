'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ICheckoutProduct } from '@/types';

interface ProductItemProps {
    product: ICheckoutProduct;
    onQuantityChange: (quantity: number) => void;
}

const ProductItem = ({ product, onQuantityChange }: ProductItemProps) => {
    const handleIncrement = () => {
        onQuantityChange(product.quantity + 1);
    };

    const handleDecrement = () => {
        if (product.quantity > 1) {
            onQuantityChange(product.quantity - 1);
        }
    };

    return (
        <div className='py-6 flex flex-col sm:flex-row gap-4'>
            <div className='sm:w-32 flex-shrink-0'>
                <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={120}
                    height={150}
                    className='w-full object-cover'
                />
            </div>

            <div className='flex-1'>
                <h3 className='font-medium'>{product.brand}</h3>
                <p className='text-sm mb-2'>{product.name}</p>

                <div className='text-sm space-y-1 mb-3'>
                    <p>Size: {product.size}</p>
                    <p>Color: {product.color}</p>
                    <p>Web ID: {product.webId}</p>
                </div>

                <button className='text-sm underline mb-3'>Remove</button>
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
                                onClick={handleDecrement}
                            >
                                −
                            </Button>
                            <div className='flex items-center justify-center w-10 h-10 border-x'>
                                {product.quantity}
                            </div>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-10 w-10 rounded-l-none'
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    <div className='text-right'>
                        {product.discount && (
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2'>
                                    <span className='font-medium'>
                                        BDT {product.price.toFixed(2)}
                                    </span>
                                    <span className='text-sm text-red-500'>
                                        ({product.discount})
                                    </span>
                                </div>
                                <span className='text-sm line-through'>
                                    BDT {product.originalPrice?.toFixed(2)}
                                </span>
                            </div>
                        )}
                        {!product.discount && (
                            <span className='font-medium'>
                                BDT {product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
