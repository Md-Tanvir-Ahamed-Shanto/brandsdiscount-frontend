/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MapPin, ArrowRight, Edit } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

const ShippingInformation = ({ userDetails }: any) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center'>
                    <MapPin className='mr-2 h-5 w-5' />
                    Shipping Information
                </CardTitle>
                <CardDescription>
                    Your order will be delivered to this address
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!userDetails ? (
                    <>
                        You have to update your profile before checkout.
                        <Link
                            href='/profile'
                            className='block mt-2 font-medium underline'
                        >
                            Update Profile{' '}
                            <ArrowRight className='h-4 w-4 inline ml-1' />
                        </Link>
                    </>
                ) : (
                    <div className='space-y-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>
                                    Full Name
                                </p>
                                <p className='font-medium'>
                                    {userDetails.fullName}
                                </p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>
                                    Phone Number
                                </p>
                                <p className='font-medium'>
                                    {userDetails.phoneNumber}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className='text-sm font-medium text-muted-foreground'>
                                Address
                            </p>
                            <p className='font-medium'>
                                {userDetails.addressLine1}
                            </p>
                            {userDetails.addressLine2 && (
                                <p className='font-medium'>
                                    {userDetails.addressLine2}
                                </p>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>
                                    City
                                </p>
                                <p className='font-medium'>
                                    {userDetails.city}
                                </p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>
                                    State/Province
                                </p>
                                <p className='font-medium'>
                                    {userDetails.stateProvince}
                                </p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'>
                                    Postal Code
                                </p>
                                <p className='font-medium'>
                                    {userDetails.postalCode}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className='text-sm font-medium text-muted-foreground'>
                                Country
                            </p>
                            <p className='font-medium'>{userDetails.country}</p>
                        </div>

                        <div className='pt-2'>
                            <Link
                                href='/profile'
                                className='text-sm flex items-center text-primary hover:underline'
                            >
                                <Edit className='h-4 w-4 mr-1' />
                                Change shipping information
                            </Link>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ShippingInformation;
