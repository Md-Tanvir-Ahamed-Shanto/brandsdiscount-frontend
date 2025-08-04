'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent
} from '@/components/ui/card';
import { useGetSingleProfileQuery } from '@/api';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { MyTokenPayload } from '@/app/(profile)/profile/page';

export default function LoyaltyPoints() {
    const [userId, setUserId] = useState<string | null>(null);
    const { data: userData } = useGetSingleProfileQuery(userId, {
        skip: !userId
    });

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode<MyTokenPayload>(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return (
        <div className='flex items-center p-4'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Loyalty Points</CardTitle>
                    <CardDescription>
                        View and manage your loyalty points balance
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='text-center'>
                        <h3 className='text-4xl font-bold mb-2'>
                            {userData?.loyaltyPoints || 0}
                        </h3>
                        <p className='text-gray-600'>Available Points</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}