'use client';
import { useDeleteSingleProductMutation, useGetAllProductsQuery } from '@/api';
import Pagination from '@/app/(admin)/components/pagination/pagination';
import withSuspense from '@/app/(admin)/components/suspense/withSuspense';
import { LoaderWrapper } from '@/components';
import { IProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SuspendedPagination = withSuspense(Pagination);

const AllProduct = ({
    page,
    searchKey
}: {
    page: string;
    searchKey: string;
}) => {
    console.log('searchKey', searchKey);

    const {
        data: productData,
        isLoading,
        isError,
        error
    } = useGetAllProductsQuery(page);

    const [deleteUser, { isLoading: isLoadingUser }] =
        useDeleteSingleProductMutation();

    const [data, setData] = useState<IProduct[]>([]);

    useEffect(() => {
        if (Array.isArray(productData?.data)) {
            setData(productData.data);
        }
    }, [productData]);

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
                ? data?.map((product) => (
                      <tr key={product?.id} className='border-b'>
                          <td>
                              <span className='flex items-center gap-2 p-3'>
                                  <Image
                                      src={
                                          product?.images[0] ||
                                          '/astronaut.png'
                                      }
                                      alt=''
                                      width={40}
                                      height={40}
                                      className='rounded-full object-cover'
                                  />
                                  {product?.title}
                              </span>
                          </td>
                          <td className='p-3'>{product?.brandName}</td>
                          <td className='p-3'>{product?.color}</td>
                          <td className='p-3'>{product?.sku}</td>
                          <td className='p-3'>{product?.itemLocation}</td>
                          <td className='p-3'>{product?.status}</td>
                          <td className='p-3 flex gap-2'>
                              <span className='flex gap-2'>
                                  <Link
                                      href={`/dashboard/products/view/${product.id}`}
                                  >
                                      <button className='py-1 px-3 bg-green-500 text-white rounded'>
                                          View
                                      </button>
                                  </Link>
                                  <Link
                                      href={`/dashboard/products/${product.id}`}
                                  >
                                      <button className='py-1 px-3 bg-teal-500 text-white rounded'>
                                          Edit
                                      </button>
                                  </Link>
                                  <button
                                      disabled={isLoadingUser}
                                      className='px-3 py-1 bg-red-500 text-white rounded'
                                      onClick={() => handleDelete(product.id)}
                                  >
                                      Delete
                                  </button>
                              </span>
                          </td>
                      </tr>
                  ))
                : null}
            <tr>
                <td>
                    <SuspendedPagination
                        count={productData?.totalRecords | 1}
                    />
                    <LoaderWrapper
                        isLoading={isLoading}
                        isError={isError}
                        error={error as { message: string } | undefined}
                    />
                </td>
            </tr>

            {/* <span className='!w-full block'>
                <SuspendedPagination count={userData?.totalRecords | 1} />
            </span> */}

            {/* {
                <LoaderWrapper
                    isLoading={isLoading}
                    isError={isError}
                    error={error as { message: string } | undefined}
                />
            } */}
        </>
    );
};

export default AllProduct;
