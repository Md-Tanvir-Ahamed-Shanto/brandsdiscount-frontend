'use client';
import { useEffect, useState } from 'react';
import type React from 'react';
import { useGetSingleOrderQuery, useUpdateSingleOrderMutation } from '@/api';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LoaderWrapper } from '@/components';
import FormLabel from '@/components/ui/FormLabel';
import BackBtn from '@/components/shared/Back';

const SingleOrderPage = () => {
    const router = useRouter();
    const { id } = useParams();

    const [
        updateOrder,
        {
            isLoading: isLoadingUpdate,
            isError: isErrorUpdate,
            error: errorUpdate
        }
    ] = useUpdateSingleOrderMutation();

    const {
        data: orderData,
        isLoading,
        isError,
        error
    } = useGetSingleOrderQuery(id);

    const [formData, setFormData] = useState({
        status: '',
        totalAmount: 0,
        transactionId: ''
    });

    // Update formData when orderData is available
    useEffect(() => {
        if (orderData) {
            setFormData({
                status: orderData.status || '',
                totalAmount: orderData.totalAmount || 0,
                transactionId: orderData.transactionId || ''
            });
        }
    }, [orderData]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updated order data:', { id, ...formData });

        try {
            const response = await updateOrder({ id, ...formData }).unwrap();

            if (response?.success) {
                window.location.href = '/dashboard/order';
                router.push('/dashboard/order');
                toast.success('Order updated successfully');
            } else {
                toast.success('Order updated successfully');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to update order';
            toast.error(errorMessage);
            console.error('Error updating order:', err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading order data.</p>;

    return (
        <div className='mt-5 mx-5'>
            <BackBtn labelFor='Order' url='/dashboard/order' className='pl-2' />
            {/* Order Edit Form */}
            <div className='flex-[6] bg-bgAdminAdmin-soft p-5 rounded-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    {/* Status Field (at the top as requested) */}
                    <FormLabel>Status</FormLabel>
                    <select
                        name='status'
                        value={formData.status}
                        onChange={handleSelectChange}
                        className='!bg-white text-gray-500 p-5 border-2 border-[#2e374a] rounded-md !bg-transparent text-text mb-5'
                    >
                        <option value=''>Select Status</option>
                        <option value='pending'>Pending</option>
                        <option value='processing'>Processing</option>
                        <option value='completed'>Completed</option>
                        <option value='cancelled'>Cancelled</option>
                        <option value='refunded'>Refunded</option>
                    </select>

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
                    error={
                        (errorUpdate as { message: string } | undefined) ||
                        (error as { message: string } | undefined)
                    }
                />
            </div>
        </div>
    );
};

export default SingleOrderPage;
