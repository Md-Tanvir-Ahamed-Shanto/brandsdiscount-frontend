/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useGetSingleProductQuery } from '@/api';
import { LoaderWrapper } from '@/components';
import Avatar from '@/components/Avatar';
import BackBtn from '@/components/shared/Back';
import React, { useEffect, useState } from 'react';

const SingleProduct = ({ params }: { params: any }) => {
    const [data, setData] = useState<any>();
    const { id } = params;
    const {
        data: productData,
        isLoading,
        isError,
        error: errorUpdate
    } = useGetSingleProductQuery(id);

    useEffect(() => {
        if (productData) {
            setData(productData);
        }
    }, [productData]);

    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg mt-5 mx-5'>
            <LoaderWrapper
                isLoading={isLoading}
                isError={isError}
                error={errorUpdate as { message: string } | undefined}
            />

            {data && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {/* Images Section */}
                    <div className='space-y-4'>
                        <BackBtn
                            labelFor='Products'
                            url='/dashboard/products'
                            className='mb-6'
                        />
                        <h2 className='text-xl font-semibold text-bgAdminText'>
                            Product Images
                        </h2>
                        <div className='grid grid-cols-2 gap-4'>
                            {data.images.map((image: any) => (
                                <div
                                    key={image.id}
                                    className='relative aspect-square'
                                >
                                    <Avatar
                                        src={image.url}
                                        alt={data.title}
                                        className='w-full h-full object-cover rounded-lg border-2 border-[#2e374a]'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className='space-y-4'>
                        <h2 className='text-xl font-semibold text-bgAdminText'>
                            Product Details
                        </h2>

                        <div className='space-y-4 p-4 bg-bgAdmin rounded-lg border-2 border-[#2e374a]'>
                            {/* Basic Info */}
                            <div className='grid grid-cols-1 gap-4'>
                                <div>
                                    <label className='block text-sm text-gray-400 mb-1'>
                                        Title
                                    </label>
                                    <input
                                        type='text'
                                        value={data.title}
                                        readOnly
                                        className='p-2 w-full bg-bgAdmin text-text rounded border-2 border-[#2e374a]'
                                    />
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm text-gray-400 mb-1'>
                                            Brand
                                        </label>
                                        <input
                                            type='text'
                                            value={data.brandName}
                                            readOnly
                                            className='p-2 w-full bg-bgAdmin text-text rounded border-2 border-[#2e374a]'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm text-gray-400 mb-1'>
                                            Color
                                        </label>
                                        <input
                                            type='text'
                                            value={data.color}
                                            readOnly
                                            className='p-2 w-full bg-bgAdmin text-text rounded border-2 border-[#2e374a]'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Section */}
                            <div className='grid grid-cols-2 gap-4 pt-4 border-t border-[#2e374a]'>
                                <div>
                                    <label className='block text-sm text-gray-400 mb-1'>
                                        Regular Price
                                    </label>
                                    <div className='p-2 bg-bgAdmin text-text rounded border-2 border-[#2e374a]'>
                                        ${data.regularPrice}
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-sm text-gray-400 mb-1'>
                                        Sale Price
                                    </label>
                                    <div className='p-2 bg-bgAdmin text-text rounded border-2 border-[#2e374a]'>
                                        ${data.salePrice}
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-sm text-gray-400 mb-1'>
                                        Discount
                                    </label>
                                    <div className='p-2 bg-bgAdmin text-text rounded border-2 border-[#2e374a]'>
                                        {data.discountPercent}%
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-sm text-gray-400 mb-1'>
                                        Stock
                                    </label>
                                    <div className='p-2 bg-bgAdmin text-text rounded border-2 border-[#2e374a]'>
                                        {data.stockQuantity} units
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className='pt-4 border-t border-[#2e374a]'>
                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm text-gray-400 mb-1'>
                                            Description
                                        </label>
                                        <textarea
                                            value={data.description}
                                            readOnly
                                            className='p-2 w-full bg-bgAdmin text-text rounded border-2 border-[#2e374a] h-32'
                                        />
                                    </div>

                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label className='block text-sm text-gray-400 mb-1'>
                                                Status
                                            </label>
                                            <div
                                                className={`p-2 rounded ${data.status === 'draft' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}
                                            >
                                                {data.status}
                                            </div>
                                        </div>
                                        <div>
                                            <label className='block text-sm text-gray-400 mb-1'>
                                                Last Updated
                                            </label>
                                            <div className='p-2 bg-bgAdmin text-text rounded border-2 border-[#2e374a]'>
                                                {new Date(
                                                    data.updatedAt
                                                ).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProduct;
