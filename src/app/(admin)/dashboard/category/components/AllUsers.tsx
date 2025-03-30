'use client';
import { useDeleteSingleCategoryMutation, useGetAllCategoryQuery } from '@/api';
import Pagination from '@/app/(admin)/components/pagination/pagination';
import withSuspense from '@/app/(admin)/components/suspense/withSuspense';
import { LoaderWrapper } from '@/components';
import { ICategory } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SuspendedPagination = withSuspense(Pagination);

const AllUsers = ({ page }: { page: string }) => {
    const {
        data: categoryData,
        isLoading,
        isError,
        error
    } = useGetAllCategoryQuery(page);
    const [deleteSize, { isLoading: isLoadingUser }] =
        useDeleteSingleCategoryMutation();

    const [data, setData] = useState<ICategory[]>([]);
    console.log('🚀 ~ AllUsers ~ page:', page);

    useEffect(() => {
        if (Array.isArray(categoryData?.data)) {
            setData(categoryData.data);
        }
    }, [categoryData]);

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteSize(id);
            if (response) {
                toast.success('Category Deleted successfully');
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { data?: { message?: string } })?.data?.message ||
                'Failed to Updated category';
            toast.error(errorMessage);
            console.error('Error category user:', err);
        }
    };

    return (
        <>
            {!isLoading && data
                ? data?.map((category) => (
                      <tr key={category.id} className='border-b'>
                          <td className='p-3'>{category?.name}</td>

                          <td className='p-3 flex gap-2'>
                              <span className='flex gap-2'>
                                  <Link
                                      href={`/dashboard/category/${category.id}`}
                                  >
                                      <button className='py-1 px-3 bg-teal-500 text-white rounded'>
                                          Edit
                                      </button>
                                  </Link>
                                  <button
                                      disabled={isLoadingUser}
                                      className='px-3 py-1 bg-red-500 text-white rounded'
                                      onClick={() => handleDelete(category?.id)}
                                  >
                                      Delete
                                  </button>
                              </span>
                          </td>
                      </tr>
                  ))
                : null}

            <div className='!w-full block'>
                <SuspendedPagination count={categoryData?.totalRecords | 1} />
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
