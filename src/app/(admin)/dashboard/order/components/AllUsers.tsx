'use client';
import { useDeleteSingleOrderMutation, useGetAllOrderQuery } from '@/api';
import Pagination from '@/app/(admin)/components/pagination/pagination';
import withSuspense from '@/app/(admin)/components/suspense/withSuspense';
import { LoaderWrapper } from '@/components';
import { IOrder } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SuspendedPagination = withSuspense(Pagination);

const AllOrder = ({ page }: { page: string }) => {
    const {
        data: sizeData,
        isLoading,
        isError,
        error
    } = useGetAllOrderQuery(page);
    const [deleteOrder, { isLoading: isLoadingDeleteOrder }] =
        useDeleteSingleOrderMutation();

    const [data, setData] = useState<IOrder[]>([]);

    useEffect(() => {
        if (Array.isArray(sizeData?.data)) {
            setData(sizeData.data);
        }
    }, [sizeData]);

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteOrder(id);
            console.log('🚀 ~ handleDelete ~ response:', response);
            if (response) {
                toast.success('Order Deleted successfully');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to Updated user';
            toast.error(errorMessage);
            console.error('Error Updated user:', err);
        }
    };

    return (
        <>
            {!isLoading && data
                ? data?.map((order) => (
                      <tr key={order.id} className='border-b'>
                          <td className='p-3'>{order?.id}</td>
                          <td className='p-3'>{order?.status}</td>
                          <td className='p-3'>{order?.transaction?.id}</td>
                          <td className='p-3'>{order?.transaction?.amount}</td>
                          <td className='p-3'>{order?.transaction?.status}</td>

                          <td className='p-3 flex gap-2'>
                              <span className='flex gap-2'>
                                  <Link
                                      href={`/dashboard/order/view/${order.id}`}
                                  >
                                      <button className='py-1 px-3 bg-green-500 text-white rounded'>
                                          View
                                      </button>
                                  </Link>
                                  <Link href={`/dashboard/order/${order.id}`}>
                                      <button className='py-1 px-3 bg-teal-500 text-white rounded'>
                                          Update
                                      </button>
                                  </Link>
                                  <button
                                      disabled={isLoadingDeleteOrder}
                                      className='px-3 py-1 bg-red-500 text-white rounded'
                                      onClick={() => handleDelete(order?.id)}
                                  >
                                      Delete
                                  </button>
                              </span>
                          </td>
                      </tr>
                  ))
                : null}

            <div className='!w-full block'>
                <SuspendedPagination count={sizeData?.totalRecords | 1} />
            </div>

            {
                <LoaderWrapper
                    isLoading={isLoading || isLoadingDeleteOrder}
                    isError={isError}
                    error={error as { message: string } | undefined}
                />
            }
        </>
    );
};

export default AllOrder;
