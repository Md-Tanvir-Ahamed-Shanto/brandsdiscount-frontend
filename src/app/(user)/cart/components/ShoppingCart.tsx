'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductItem from './ProductItem';
import Link from 'next/link';
import {
    clearCart,
    RootState,
    selectCartSavings,
    selectCartSubtotal,
    useAppDispatch,
    useAppSelector
} from '@/store';
import toast from 'react-hot-toast';

const ShoppingCart = () => {
    const [promoCode, setPromoCode] = useState('');

    const dispatch = useAppDispatch();
    const subtotal = useAppSelector(selectCartSubtotal);
    const savings = useAppSelector(selectCartSavings);

    const cart = useAppSelector((state: RootState) => state.cart.products);

    const handleApplyPromoCode = () => {
        console.log('Promo code applied:', promoCode);
    };

    return (
        <div className='flex flex-col lg:flex-row gap-8 relative'>
            {/* Left side - Product list (uses main scrollbar) */}
            <div className='flex-1'>
                <h1 className='text-2xl font-bold mb-4'>
                    Your Bag {cart?.length} Items{' '}
                </h1>

                <div className='space-y-6 divide-y'>
                    {cart?.map((singleProduct) => (
                        <ProductItem
                            key={singleProduct.id}
                            product={singleProduct}
                        />
                    ))}
                </div>
                <button
                    onClick={() => {
                        dispatch(clearCart());
                        toast.success('All product removed successfully');
                    }}
                    className={`w-full mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-all duration-200 shadow-sm ${cart?.length > 0 ? 'show' : 'hidden'}`}
                >
                    🗑️ Remove All Items From Cart
                </button>
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
                            $ {subtotal.toFixed(2)}
                        </span>
                    </div>

                    <div className='text-red-500'>
                        You save $ {savings.toFixed(2)} (
                        {Math.round((savings / (subtotal + savings)) * 100) ||
                            0}
                        %)
                    </div>

                    <Link href='/checkout'>
                        <Button className='w-full bg-red-700 hover:bg-red-800'>
                            Proceed To Checkout
                        </Button>
                    </Link>

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
