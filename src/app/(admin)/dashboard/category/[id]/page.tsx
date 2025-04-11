/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import {
    useGetSingleCategoryQuery,
    useUpdateSingleCategoryMutation
} from '@/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LoaderWrapper } from '@/components';
import BackBtn from '@/components/shared/Back';

const SingleCategoryPage = ({ params }: { params: any }) => {
    const router = useRouter();
    const { id } = params;

    const [
        updateCategory,
        {
            isLoading: isLoadingUpdate,
            isError: isErrorUpdate,
            error: errorUpdate
        }
    ] = useUpdateSingleCategoryMutation();

    const {
        data: userData,
        isLoading,
        isError
    } = useGetSingleCategoryQuery(id);

    const [formData, setFormData] = useState({
        name: ''
    });

    useEffect(() => {
        if (userData?.name) {
            setFormData({ name: userData.name });
        }
    }, [userData?.name]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await updateCategory({ id, ...formData }).unwrap(); // Ensure id is passed

            if (response?.success) {
                toast.success('Category Data Updated successfully');
                router.push('/dashboard/category');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to update Category';
            toast.error(errorMessage);
            console.error('Error updating Category:', err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading Category data.</p>;

    return (
        <div className='mt-5 mx-5'>
            <BackBtn
                labelFor='Category'
                url='/dashboard/category'
                className='mb-2 pt-2'
            />
            {/* User Edit Form */}
            <div className='flex-[6] bg-bgAdminAdmin-soft p-5 rounded-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <label className='text-sm mb-4'>Category</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Enter Category'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='p-5 border-2 border-[#2e374a] rounded-md !bg-transparent text-text mb-5'
                    />

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full p-5 bg-teal-500 text-text rounded-md cursor-pointer mt-5'
                    >
                        Update
                    </button>
                </form>
                <LoaderWrapper
                    isLoading={isLoadingUpdate}
                    isError={isErrorUpdate}
                    error={errorUpdate as { message: string } | undefined}
                />
            </div>
        </div>
    );
};

export default SingleCategoryPage;
