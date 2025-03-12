import { Star } from 'lucide-react';
import Avatar from '@/components/Avatar';
import { ProductCardProps } from '@/types';
import Link from 'next/link';
import { convertToUrl } from '@/lib';

const ProductCard = ({
    image,
    brand,
    name,
    regularPrice,
    vipPrice,
    vipOffer,
    discount,
    rating,
    reviews
}: ProductCardProps) => {
    return (
        <div className='group relative'>
            {/* Discount Badge */}
            <div className='absolute left-0 top-4 z-10 bg-red-600 text-white px-2 py-1'>
                -{discount}%
            </div>

            {/* Limited Time Special Badge */}
            <div className='absolute left-4 bottom-[40%] z-10 bg-amber-500 text-white px-2 py-1 text-sm'>
                Limited-Time Special
            </div>

            {/* Product Image */}
            <Link
                href={`/shop/${convertToUrl(brand)}`}
                className='relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 block'
            >
                <Avatar
                    src={image || '/placeholder.svg'}
                    alt={name}
                    className='object-cover object-center'
                />
            </Link>

            {/* Product Details */}
            <Link
                href={`/shop/${convertToUrl(brand)}`}
                className='mt-4 space-y-2'
            >
                <h3 className='font-medium text-gray-700'>{brand}</h3>
                <p className='text-sm text-gray-600'>{name}</p>

                {/* Pricing */}
                <div className='space-y-1'>
                    <div className='text-sm text-green-600'>
                        NEW VIP OFFER: ${vipOffer.toFixed(2)}
                    </div>
                    <div className='text-sm'>
                        VIP Price: ${vipPrice.toFixed(2)}
                    </div>
                    <div className='text-sm text-gray-500 line-through'>
                        Reg Price: ${regularPrice.toFixed(2)}
                    </div>
                </div>

                {/* Rating */}
                <div className='flex items-center gap-1'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            className={`h-4 w-4 ${
                                index < rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                            }`}
                        />
                    ))}
                    <span className='text-sm text-gray-600'>({reviews})</span>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
