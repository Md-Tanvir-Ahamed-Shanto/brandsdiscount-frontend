/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useGetSingleSizeQuery, useUpdateSingleSizeMutation } from '@/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LoaderWrapper } from '@/components';
import BackBtn from '@/components/shared/Back';

const SingleSizePage = ({ params }: { params: any }) => {
    const router = useRouter();
    const { id } = params;

    const [
        updateSize,
        {
            isLoading: isLoadingUpdate,
            isError: isErrorUpdate,
            error: errorUpdate
        }
    ] = useUpdateSingleSizeMutation();

    const { data: userData, isLoading, isError } = useGetSingleSizeQuery(id);

    const [formData, setFormData] = useState({
        name: ''
    });

    // Update formData when userData is available
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || ''
            });
        }
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updated user data:', { id, ...formData });

        try {
            const response = await updateSize({ id, ...formData }).unwrap(); // Ensure id is passed

            if (response?.success) {
                toast.success('Size Data Updated successfully');
                router.push('/dashboard/size');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to update size';
            toast.error(errorMessage);
            console.error('Error updating size:', err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading user data.</p>;

    return (
        <>
            <div className='mx-5 mt-5'>
                <BackBtn
                    labelFor='Size'
                    url='/dashboard/size'
                    className='mb-6'
                />
            </div>
            <div className='flex gap-12 mx-5'>
                {/* User Edit Form */}

                <div className='flex-[6] bg-bgAdminAdmin-soft p-5 rounded-lg'>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <label className='text-sm'>Size</label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter Size'
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
        </>
    );
};

export default SingleSizePage;
