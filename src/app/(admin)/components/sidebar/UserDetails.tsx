'use client';
import { useGetSingleProfileQuery } from '@/api';
import { MyTokenPayload } from '@/app/(profile)/profile/page';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';

const UserDetails = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const { data: userData } = useGetSingleProfileQuery(userId, {
        skip: !userId,
    });

    const token = Cookies.get('token');
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<MyTokenPayload>(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [token]);

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
        <div className='flex items-center gap-2 mb-5'>
            <Image
                className='radius-[50%] object-cover'
                src={userData?.profilePicture || '/astronaut.png'}
                alt=''
                width='50'
                height='50'
            />
            <div className='flex items-center flex-col'>
                <span className='font-medium'>{userData?.username}</span>
                <span className='text-sm text-bgAdminText-soft'>
                    {userData?.role}
                </span>
            </div>
        </div>
    );
};

export default UserDetails;
