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

interface IProps {
    product: ISingleProduct;
}

const SignInModal = ({ product }: IProps) => {
    const { brandName, title, platFormPrice, salePrice } = product;
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
                            dispatch(addToCart(product));
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
                                    product?.images[0]?.url
                                        ? product?.images[0]?.url
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
                                    PLATFORM PRICE: $
                                    {platFormPrice ? platFormPrice : 0}
                                </div>
                                {/* <div className='text-sm'>
                        VIP Price: ${vipPrice.toFixed(2)}
                    </div> */}
                                <div className='text-sm text-gray-500 line-through'>
                                    Sale Price: ${salePrice ? salePrice : ''}
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
                        ) : null}
                    </>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default SignInModal;
