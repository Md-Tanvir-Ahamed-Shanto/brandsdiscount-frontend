'use client';
import { useDeleteSingleSizeMutation, useGetAllSizesQuery } from '@/api';
import Pagination from '@/app/(admin)/components/pagination/pagination';
import withSuspense from '@/app/(admin)/components/suspense/withSuspense';
import { LoaderWrapper } from '@/components';
import { ISize } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SuspendedPagination = withSuspense(Pagination);

const AllUsers = ({ page }: { page: string }) => {
    const {
        data: sizeData,
        isLoading,
        isError,
        error
    } = useGetAllSizesQuery(page);
    const [deleteSize, { isLoading: isLoadingUser }] =
        useDeleteSingleSizeMutation();

    const [data, setData] = useState<ISize[]>([]);

    useEffect(() => {
        if (Array.isArray(sizeData?.data)) {
            setData(sizeData.data);
        }
    }, [sizeData]);

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteSize(id);
            if (response) {
                toast.success('Size Deleted successfully');
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
                ? data?.map((user) => (
                      <tr key={user.id} className='border-b'>
                          <td className='p-3'>{user?.name}</td>

                          <td className='p-3 flex gap-2'>
                              <span className='flex gap-2'>
                                  <Link href={`/dashboard/size/${user.id}`}>
                                      <button className='py-1 px-3 bg-teal-500 text-white rounded'>
                                          Edit
                                      </button>
                                  </Link>
                                  <button
                                      disabled={isLoadingUser}
                                      className='px-3 py-1 bg-red-500 text-white rounded'
                                      onClick={() => handleDelete(user?.id)}
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
                    isLoading={isLoading}
                    isError={isError}
                    error={error as { message: string } | undefined}
                />
            }
        </>
    );
};

export default AllUsers;
