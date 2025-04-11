'use client';
import Avatar from '@/components/Avatar';
import { IProduct } from '@/types';
import Link from 'next/link';
// import { convertToUrl } from '@/lib';

const SingleProductCard = ({ product }: { product: IProduct }) => {
    const {
        title,
        brandName,
        // sku,
        images,
        // itemLocation,
        // sizeId,
        // sizeType,
        salePrice,
        platFormPrice,
        discountPercent
        // stockQuantity,
        // condition,
        // description,
        // status
    } = product; // Destructuring inside the function

    return (
        <div className='group relative'>
            {/* Discount Badge */}
            <div className='absolute left-0 top-4 z-10 bg-red-600 text-white px-2 py-1'>
                -{discountPercent ? discountPercent : 0}%
            </div>

            {/* Limited Time Special Badge */}
            <div className='absolute left-4 bottom-[40%] z-10 bg-amber-500 text-white px-2 py-1 text-sm'>
                Limited-Time Special
            </div>

            {/* Product Image */}
            <Link
                href={`/shop/${product?.id}`}
                // href={`/shop`}
                className='relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 block mb-4'
            >
                <Avatar
                    src={
                        images[0]?.url ? images[0]?.url : '/shop/no-image.jpeg'
                    }
                    alt={title ? title : ''}
                    className='object-cover object-center'
                    priority={true}
                />
            </Link>

            {/* Product Details */}
            <Link href={`/shop/${product?.id}`} className='mt-4 space-y-2'>
                <p className='text-sm text-gray-600'>
                    {brandName ? brandName : ''}
                </p>
                <h3 className='font-medium text-gray-700'>
                    {title ? title : ''}
                </h3>

                {/* Pricing */}
                <div className='space-y-1'>
                    <div className='text-sm text-green-600'>
                        PLATFORM PRICE: ${platFormPrice ? platFormPrice : 0}
                    </div>
                    {/* <div className='text-sm'>
                        VIP Price: ${vipPrice.toFixed(2)}
                    </div> */}
                    <div className='text-sm text-gray-500 line-through'>
                        Sale Price: ${salePrice ? salePrice : ''}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SingleProductCard;
