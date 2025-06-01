import { ISingleProduct } from '@/types';
import React from 'react';

interface IProps {
    product: ISingleProduct;
}

const AdditionalInformation = ({ product }: IProps) => {
    const {
        title,
        brandName,
        color,
        sku,
        sizeType,
        regularPrice,
        salePrice,
        condition,
        size
    } = product;
    const categoryName = product.parentCategory
        ? product.parentCategory.name + ' > ' + product.category?.name
        : product.category?.name || '';
    return (
        <div>
            <div className='w-full h-[1px] bg-gray-800 mb-8 rounded'></div>
            <h3 className='font-bold text-2xl mb-8'>Additional Information</h3>
            <div className='flex flex-col lg:flex-row gap-4 mb-8'>
                <h3 className='mr-4 text-xl font-semibold'>Description</h3>
                <p>{product?.description}</p>
            </div>
            <div className='w-full h-[1px] bg-gray-800 mb-8 rounded'></div>
            <div className='flex flex-col lg:flex-row gap-4 mb-8'>
                <h3 className='mr-4 text-xl font-semibold mb-4 lg:mb-0'>
                    Additional information
                </h3>
                <div className='!w-full'>
                    <BoxData title='Product Name' content={title} />
                    <BoxData title='Category' content={categoryName} />
                    <BoxData title='Color' content={color} />
                    <BoxData title='Brand' content={brandName} />
                    <BoxData title='Size Type' content={sizeType || 'N/A'} />
                    <BoxData title='Size' content={size?.name || 'N/A'} />
                    <BoxData title='SKU' content={sku} />
                    <BoxData title='Condition' content={condition} />
                    <BoxData
                        title='Regular Price'
                        content={`$${regularPrice}`}
                    />
                    <BoxData title='Sale Price' content={`$${salePrice}`} />
                </div>
            </div>
            <div className='w-full h-[1px] bg-gray-800 mb-8 rounded'></div>
            <div className='flex flex-col lg:flex-row gap-4 mb-8'>
                <h3 className='mr-4 text-xl font-semibold mb-4 lg:mb-0'>
                    SHIPPING
                </h3>
                <div className='!w-full'>
                    For full shipping details, click here.
                </div>
            </div>
        </div>
    );
};

export default AdditionalInformation;

const BoxData = ({
    title,
    content
}: {
    title: string;
    content: string | number;
}) => {
    return (
        <>
            <div className='grid grid-cols-12 mb-4'>
                <div className='col-span-5 lg:col-span-2'>
                    <h4 className='!uppercase font-medium'>{title}</h4>
                </div>
                <div className='col-span-5 lg:col-span-2'>
                    <p className=''>{content}</p>
                </div>
            </div>
            <div className='!w-full h-[1px] bg-[#ececec] mb-4'></div>
        </>
    );
};
