'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductItem from './ProductItem';
import { defaultProducts } from '@/static';
import Link from 'next/link';

interface ShoppingCartProps {
    initialProducts?: typeof defaultProducts;
}

const ShoppingCart = ({
    initialProducts = defaultProducts
}: ShoppingCartProps) => {
    const [products, setProducts] = useState(initialProducts);
    const [promoCode, setPromoCode] = useState('');

    // Calculate subtotal
    const subtotal = products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

    // Calculate savings (if any)
    const originalTotal = products.reduce((total, product) => {
        const originalPrice = product.originalPrice || product.price;
        return total + originalPrice * product.quantity;
    }, 0);
    const savings = originalTotal - subtotal;

    const handleApplyPromoCode = () => {
        console.log('Promo code applied:', promoCode);
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        setProducts(
            products.map((product) =>
                product.id === id
                    ? { ...product, quantity: newQuantity }
                    : product
            )
        );
    };

    return (
        <div className='flex flex-col lg:flex-row gap-8 relative'>
            {/* Left side - Product list (uses main scrollbar) */}
            <div className='flex-1'>
                <h1 className='text-2xl font-bold mb-4'>Your Bag</h1>

                <div className='space-y-6 divide-y'>
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            onQuantityChange={(quantity) =>
                                handleQuantityChange(product.id, quantity)
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Right side - Order summary (fixed) */}
            <div className='lg:w-96 lg:sticky lg:top-4 lg:self-start space-y-6'>
                <div className='border rounded-md p-4'>
                    <div className='mb-4'>
                        <h2 className='font-medium'>
                            Enter Promo Code{' '}
                            <span className='text-sm font-normal text-gray-500'>
                                Limit 1 code per order
                            </span>
                        </h2>
                        <div className='flex mt-2'>
                            <Input
                                placeholder='Enter Promo Code'
                                className='rounded-r-none'
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <Button
                                className='rounded-l-none bg-black hover:bg-gray-800'
                                onClick={handleApplyPromoCode}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>

                    <div className='border-t pt-4 text-sm'>
                        <p>
                            Shipping, duties and taxes will be calculated at
                            checkout, where applicable.
                        </p>
                    </div>
                </div>

                <div className='border rounded-md p-4 space-y-4'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-xl font-medium'>Subtotal</h2>
                        <span className='text-xl font-medium'>
                            BDT {subtotal.toFixed(2)}
                        </span>
                    </div>

                    {savings > 0 && (
                        <div className='text-red-500'>
                            You save BDT {savings.toFixed(2)} (
                            {Math.round((savings / originalTotal) * 100)}%)
                        </div>
                    )}

                    <Button className='w-full bg-red-700 hover:bg-red-800'>
                        Proceed To Checkout
                    </Button>

                    <div className='flex justify-between pt-2 text-sm'>
                        <Link
                            href='/shop'
                            className='text-gray-700 hover:underline'
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            href='/'
                            className='text-gray-700 hover:underline'
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
