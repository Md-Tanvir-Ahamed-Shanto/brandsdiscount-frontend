'use client';
import React, { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { addToCart, useAppDispatch } from '@/store';
import { ISingleProduct } from '@/types';
import Avatar from '@/components/Avatar';
import { SignUpForm } from '@/app/(auth)/auth/signup/components';
import { LoginForm } from '@/app/(auth)/auth/login/components';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { ForgotPasswordForm } from '@/app/(auth)/auth/forgot-password/components';
import toast from 'react-hot-toast';

interface IProps {
    product: ISingleProduct;
    quantity?: number;
}

const SignInModal = ({ product, quantity = 1 }: IProps) => {
    const { brandName, title, salePrice , regularPrice } = product;
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                setStep(3);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);
    return (
        <div className=''>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        className='w-full bg-red-700 hover:bg-red-800 
                                                text-white py-6'
                        onClick={() => {
                            const availableStock = product.stockQuantity ?? 0;
                            if (quantity > availableStock) {
                                toast.error(`Only ${availableStock} items available in stock`);
                                return;
                            }
                            dispatch(addToCart({ ...product, quantity }));
                        }}
                    >
                        Add To Bag
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='relative flex items-center justify-between'>
                            <p>Your First Item is ${product?.salePrice}</p>
                            <button
                                onClick={() => setOpen(false)}
                                className='absolute right-0.5 top-0.5'
                            >
                                <X className='stroke-[#FF4040]' />
                            </button>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className='flex gap-4 items-center'>
                        <div className='w-[120px]'>
                            <Avatar
                                src={
                                    product?.images[0]
                                        ? product?.images[0]
                                        : '/shop/no-image.jpeg'
                                }
                                alt={product?.title}
                                className='object-cover object-center rounded'
                                priority={true}
                            />
                        </div>
                        <div className='mt-2 space-y-2'>
                            <p className='text-sm text-gray-600'>
                                {brandName ? brandName : ''}
                            </p>
                            <h3 className='font-medium text-gray-700'>
                                {title ? title : ''}
                            </h3>

                            {/* Pricing */}
                            <div className='space-y-1'>
                                <div className='text-sm text-green-600'>
                                    SALE PRICE: $
                                    {salePrice ? salePrice : 0}
                                </div>
                                {/* <div className='text-sm'>
                        VIP Price: ${vipPrice.toFixed(2)}
                    </div> */}
                                <div className='text-sm text-gray-500 line-through'>
                                    Regular Price: ${regularPrice ? regularPrice : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <>
                        {step === 1 ? (
                            <>
                                <SignUpForm />
                                <div className='font-light flex items-center justify-center gap-2'>
                                    <p>Already a member</p>
                                    <button
                                        className='underline text-red-500'
                                        onClick={() => setStep(2)}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </>
                        ) : step === 2 ? (
                            <>
                                <LoginForm />
                                <div className='font-light gap-2'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <p>Forgot Your Password?</p>
                                        <button
                                            className='underline text-red-500'
                                            onClick={() => setStep(4)}
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <p>Don&apos;t Have An Account?</p>
                                        <button
                                            className='underline text-red-500'
                                            onClick={() => setStep(1)}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : step === 3 ? (
                            <>
                                <Link
                                    href='/cart'
                                    className='bg-gray-500 text-white p-2 rounded text-center'
                                >
                                    Visit Cart Page
                                </Link>
                                <Link
                                    href='/shop'
                                    className='bg-gray-500 text-white p-2 rounded text-center'
                                >
                                    Add More Product
                                </Link>
                            </>
                        ) : step === 4 ? (
                            <>
                                <ForgotPasswordForm />
                                <div className='font-light flex items-center justify-center gap-2'>
                                    <p>Don&apos;t Have An Account?</p>
                                    <button
                                        className='underline text-red-500'
                                        onClick={() => setStep(1)}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </>
                        ) : null}
                    </>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default SignInModal;
