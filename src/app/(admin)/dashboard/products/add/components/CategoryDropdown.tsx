/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetAllCategoryQuery, useGetAllSizesQuery } from '@/api';
import React, { useEffect, useState } from 'react';

interface DropdownProps {
    name: 'sizeId' | 'categoryId' | 'subCategoryId' | 'parentCategoryId';
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    page?: number; // Optional pagination support
}

export const CategoryDropdown: React.FC<DropdownProps> = ({
    name,
    label,
    value,
    onChange,
    page = 1
}) => {
    const { data: sizeData, isLoading: isLoadingSizes } =
        useGetAllSizesQuery(page);
    const { data: categoryData, isLoading: isLoadingCategories } =
        useGetAllCategoryQuery(page);

    const [options, setOptions] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        if (name === 'sizeId' && Array.isArray(sizeData?.data)) {
            setOptions(
                sizeData.data.map(({ id, name }: any) => ({ id, name }))
            );
        } else if (
            ['categoryId', 'subCategoryId', 'parentCategoryId'].includes(
                name
            ) &&
            Array.isArray(categoryData?.data)
        ) {
            setOptions(
                categoryData.data.map(({ id, name }: any) => ({ id, name }))
            );
        }
    }, [sizeData, categoryData, name]);

    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={isLoadingSizes || isLoadingCategories}
            className='p-4 bg-bgAdmin text-text border-2 border-[#2e374a] rounded-md w-full'
        >
            <option value=''>{`Select ${label}`}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};
