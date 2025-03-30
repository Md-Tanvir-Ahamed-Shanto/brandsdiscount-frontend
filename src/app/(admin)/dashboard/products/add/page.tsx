/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useCreateUserMutation } from '@/api';
import { LoaderWrapper } from '@/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AddProductForm from './components/ProductForm';

const AddUserPage = () => {
    const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Admin' // Default role
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData); // Log form data on submit

        try {
            const response = await createUser(formData).unwrap(); // Ensures error handling

            if (response?.success) {
                toast.success('User created successfully');
                router.push('/dashboard/users');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to create user';
            toast.error(errorMessage);
            console.error('Error creating user:', err);
        }
    };

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5'>
            <AddProductForm />
            <LoaderWrapper
                isLoading={isLoading}
                isError={isError}
                error={error as { message: string } | undefined}
            />
        </div>
    );
};

export default AddUserPage;
