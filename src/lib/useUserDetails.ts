"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useGetSingleProfileQuery } from '@/api';
import { MyTokenPayload } from '@/app/(profile)/profile/page';

export const useUserDetails = () => {
    const [userId, setUserId] = useState<string | null>(null); 
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

    const { data, error, isLoading } = useGetSingleProfileQuery(userId, {
        skip: !userId,
    });

    return {
        user: data,
        isLoading,
        error,
    };
};
