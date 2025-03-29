'use client';
import { useDeleteSingleUserMutation, useGetAllUsersQuery } from '@/api';
import Pagination from '@/app/(admin)/components/pagination/pagination';
import withSuspense from '@/app/(admin)/components/suspense/withSuspense';
import { LoaderWrapper } from '@/components';
import { IUser } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SuspendedPagination = withSuspense(Pagination);

const AllUsers = ({ page }: { page: string }) => {
    const {
        data: userData,
        isLoading,
        isError,
        error
    } = useGetAllUsersQuery(page);
    const [deleteUser, { isLoading: isLoadingUser }] =
        useDeleteSingleUserMutation();

    const [data, setData] = useState<IUser[]>([]);

    useEffect(() => {
        if (Array.isArray(userData?.data)) {
            setData(userData.data);
        }
    }, [userData]);

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteUser(id);
            console.log('🚀 ~ handleDelete ~ response:', response);
            if (response) {
                toast.success('User Delete successfully');
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
                          <td>
                              <span className='flex items-center gap-2 p-3'>
                                  <Image
                                      src={
                                          user?.profilePicture ||
                                          '/astronaut.png'
                                      }
                                      alt=''
                                      width={40}
                                      height={40}
                                      className='rounded-full object-cover'
                                  />
                                  {user.username}
                              </span>
                          </td>
                          <td className='p-3'>{user.username}</td>
                          <td className='p-3'>{user.email}</td>
                          <td className='p-3'>{user.role ? user.role : ''}</td>
                          <td className='p-3'>{user.loyaltyStatus}</td>
                          <td className='p-3'>{user.orderPoint}</td>

                          <td className='p-3 flex gap-2'>
                              <span className='flex gap-2'>
                                  <Link href={`/dashboard/users/${user.id}`}>
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
                <SuspendedPagination count={userData?.totalRecords | 1} />
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
