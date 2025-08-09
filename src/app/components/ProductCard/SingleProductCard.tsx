'use client';
import Avatar from '@/components/Avatar';
import { slugify } from '@/lib';
import { IProduct } from '@/types';
import Link from 'next/link';
// import { convertToUrl } from '@/lib';

const SingleProductCard = ({ product }: { product: IProduct }) => {
    const {
        title,
        brandName,
        salePrice,
        regularPrice,
        toggleFirstDeal
    } = product;

    const discountPercent = regularPrice && salePrice
        ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
        : toggleFirstDeal ? 10 : 0;

    return (
        <div className='group relative bg-gray-100 p-2 shadow-md rounded '>
            {/* Discount Badge */}
            <div className='absolute left-0 top-4 z-10 bg-red-600 text-white px-2 py-1'>
                -{discountPercent ? discountPercent : 15}%
            </div>

            {/* Limited Time Special Badge */}
            <div className='absolute left-0 bottom-[40%] z-10 bg-amber-500 text-white px-2 py-1 text-sm'>
                Limited-Time Special
            </div>

            {/* Product Image */}
            <Link
                href={`/shop/product/${slugify(title)}/?id=${product?.id} `}
                // href={`/shop`}
                className='relative overflow-hidden h-80 rounded-lg block mb-4 bg-white'
            >
                <Avatar
                    src={
                        product.imageUrl || product.images[0] || '/shop/no-image.jpeg'
                    }
                    alt={title ? title : ''}    
                    className='object-scale-down w-full h-80 rounded'
                    priority={true}
                />
            </Link>

            {/* Product Details */}
            <Link
                href={`/shop/product/${slugify(title)}/?id=${product?.id}`}
                className='mt-4 space-y-2'
            >
                <p className='text-sm text-gray-600'>
                    {brandName ? brandName : ''}
                </p>
                <h3 className='font-medium text-gray-700'>
                    {title ? title : ''}
                </h3>

                {/* Pricing */}
                <div className='space-y-1'>
                    <div className='text-sm text-green-600'>
                        Sale Price: ${salePrice ? salePrice.toFixed(2) : 0}
                    </div>
                    {regularPrice && regularPrice > (salePrice || 0) && (
                        <div className='text-sm text-gray-500 line-through'>
                            Regular Price: ${regularPrice.toFixed(2)}
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default SingleProductCard;
