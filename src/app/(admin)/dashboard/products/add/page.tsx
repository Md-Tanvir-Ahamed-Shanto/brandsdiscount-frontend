/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useCreateUserMutation } from '@/api';
import { LoaderWrapper } from '@/components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddProductForm from './components/ProductForm';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { MyTokenPayload } from '@/app/(profile)/profile/page';

const AddUserPage = () => {
    const [userId, setUserId] = useState<string | null>(null);
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
    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5 mx-5'>
            <AddProductForm userId={userId} />
        </div>
    );
};

export default AddUserPage;
