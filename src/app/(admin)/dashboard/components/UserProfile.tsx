/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail } from 'lucide-react';
// import { Phone, MapPin, Mail, Building, Globe } from 'lucide-react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useGetSingleProfileQuery } from '@/api';

interface UserProfile {
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
    profileImage?: string;
    email?: string;
}

interface MyTokenPayload {
    id: string;
    email?: string;
}

export default function UserProfile() {
    // const [userData, setUserData] = useState<UserProfile | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const { data: userData } = useGetSingleProfileQuery(userId, {
        skip: !userId,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode<MyTokenPayload>(token);
                setUserId(decoded.id as any);
                setLoading(false);
            } catch (error) {
                console.error('Error decoding token:', error);
                setLoading(false);
            }
        }
    }, []);

    if (loading) {
        return (
            <Card className='w-full mx-auto bg-[#192133] text-white'>
                <CardContent className='p-6'>
                    <div className='flex flex-col items-center justify-center space-y-4'>
                        <div className='w-16 h-16 rounded-full bg-gray-200 animate-pulse' />
                        <div className='w-48 h-6 bg-gray-200 animate-pulse rounded' />
                        <div className='w-32 h-4 bg-gray-200 animate-pulse rounded' />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!userData) return null;

    return (
        <Card className='w-full mx-auto bg-[#192133] text-white'>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                    Account Information
                </CardTitle>    
            </CardHeader>

            <CardContent className='px-6'>
                <div className='flex flex-col md:flex-row gap-6'>
                    {/* User Profile Section */}
                    <div className='flex-1'>
                        <div className='flex items-center space-x-4 mb-6'>
                            <Avatar className='h-16 w-16 border-2 border-primary/20'>
                                <AvatarImage
                                    src={
                                        userData?.profilePicture
                                    }
                                    alt={userData?.role}
                                />
                                <AvatarFallback>
                                    {userData.role
                                        .substring(0, 1)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className='text-xl font-semibold'>
                                    {userData?.username}
                                </h3>
                                <p className='text-muted-foreground'>
                                    {userData?.role} User
                                </p>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div className='flex items-center gap-2'>
                                <Mail className='h-4 w-4 text-muted-foreground' />
                                <span>{userData.email}</span>
                            </div>
                            {/* <div className='flex items-center gap-2'>
                                <Phone className='h-4 w-4 text-muted-foreground' />
                                <span>{userData?.createdAt}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MapPin className='h-4 w-4 text-muted-foreground' />
                                <span>
                                    {userData.loyaltyStatus} (loyaltyStatus)
                                </span>
                            </div> */}
                            {/*  <div className='flex items-center gap-2'>
                                <Building className='h-4 w-4 text-muted-foreground' />
                                <span>
                                    {userData.city}, {userData.stateProvince}{' '}
                                    {userData.postalCode}
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Globe className='h-4 w-4 text-muted-foreground' />
                                <span>{userData.country}</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
