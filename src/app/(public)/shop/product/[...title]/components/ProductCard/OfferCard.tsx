import { selectCartSavings } from '@/store/cart';
import { useAppSelector } from '@/store';
import { ISingleProduct } from '@/types';

const OfferCard = ({
    product,
    isAllowedForFirstItemDiscount
}: {
    product: ISingleProduct;
    isAllowedForFirstItemDiscount?: boolean;
}) => {
    const savings = useAppSelector(selectCartSavings);

    return (
        <>
            {isAllowedForFirstItemDiscount && (
                <div className='bg-[#fff3cd] text-[#856404] border-l-4 border-[#ffeeba] p-3 my-4 rounded-md'>
                    <p className='font-semibold text-sm'>
                        ✨ Special First Item Offer! ✨
                    </p>
                    <p className='text-xs'>
                        Get this (or any first item) for an{' '}
                        <strong className='text-[#e01922] !text-lg'>
                            unbelievable $10
                        </strong>{' '}
                        when you spend $60 or more. This offer is visible until
                        your first eligible item is added to the cart.
                    </p>
                </div>
            )}

            <div className='my-5 p-4 bg-gray-50 rounded-lg'>
                <div className='flex items-baseline mb-1'>
                    <p className='text-md text-gray-600 mr-2'>
                        Regular Price:{' '}
                        <span className='price-strike'>
                            ${product.regularPrice.toFixed(2)}
                        </span>
                    </p>
                </div>
                {product.salePrice && (
                    <p className='text-xl font-semibold text-[#e01922] mb-1'>
                        Sale Price: ${product.salePrice.toFixed(2)}
                    </p>
                )}
                <div>
                    {isAllowedForFirstItemDiscount && (
                        <>
                            <p className='text-sm text-gray-700'>
                                Your First Item Price (New Customers, Order
                                $60+):
                            </p>
                            <p className='text-xl font-semibold text-[#e01922]'>
                                $10.00
                            </p>
                        </>
                    )}
                    <p className='text-[#28a745] font-semibold text-sm mt-1'>
                        You Save ${product.regularPrice - product.salePrice} on
                        this item!
                    </p>
                </div>
                {isAllowedForFirstItemDiscount && (
                    <p className='text-xs text-gray-500 mt-2'>
                        Discount applied at checkout if eligible. Offer applies
                        to one item per new customer order of $60+.
                    </p>
                )}
            </div>
        </>
    );
};
export { OfferCard };
