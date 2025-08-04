import { sizeChartMap } from '@/static';
import { ISingleProduct } from '@/types';
import { ProductStock } from './ProductStock';
import { OfferCard } from './OfferCard';
import { SizeChart } from './SizeChart';
import { AvailablePaymentMethods } from './AvailablePayments';
import AdditionalInformation from '../AdditionalInformation';
import ProductImage from '../ProductImage';
import AuthModal from '../AuthModal';

const ProductCard = ({
    product,
    quantity,
    setQuantity,
    isAllowedForFirstItemDiscount
}: {
    product: ISingleProduct;
    quantity: number;
    setQuantity: (quantity: number) => void;
    isAllowedForFirstItemDiscount?: boolean;
}) => {
    console.log("product", product)
    const sizeChartImage = product.categoryId
        ? sizeChartMap[product.categoryId as keyof typeof sizeChartMap]
        : undefined;

    return (
        <>
            <div className='container mx-auto p-4 md:p-6 max-w-5xl bg-white rounded-xl shadow-xl mt-1'>
                <div className='md:flex md:space-x-8'>
                    <div className='md:w-1/2 max-w-[480px] mx-auto overflow-hidden'>
                        <img src={product?.images[0] || ''} />
                    </div>
                    <div className='md:w-1/2 mt-6 md:mt-0 flex flex-col justify-between'>
                        <div>
                            {product.brandName && (
                                <p className='text-sm font-medium text-[#e01922] mb-1'>
                                    Brand: {product.brandName}
                                </p>
                            )}
                            <h1 className='text-2xl lg:text-3xl font-bold text-[#212529] leading-tight'>
                                {product.title}
                            </h1>
                            {product.color && (
                                <p className='text-sm text-[#495057] mt-1'>
                                    Color: {product.color}
                                </p>
                            )}
                            {product.size?.name && (
                                <p className='text-sm text-[#495057] mt-1 mb-3'>
                                    Size: {product.size.name}
                                </p>
                            )}
                            <SizeChart chartImage={sizeChartImage} />
                            <ProductStock product={product} />
                            <OfferCard
                                product={product}
                                isAllowedForFirstItemDiscount={
                                    isAllowedForFirstItemDiscount
                                }
                            />
                            <div className='mb-5'>
                                <label
                                    htmlFor='quantity'
                                    className='block text-sm font-medium text-gray-700 mb-1'
                                >
                                    Quantity:
                                </label>
                                <input
                                    type='number'
                                    name='quantity'
                                    value={quantity}
                                    min={1}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setQuantity(value);
                                    }}
                                    disabled={product.status === 'outofstock'}
                                    className='w-24 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150'
                                />
                            </div>
                        </div>

                        <div>
                            <AuthModal product={product} quantity={quantity} />
                            <AvailablePaymentMethods />
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-12 container mx-auto'>
                <AdditionalInformation product={product} />
            </div>
        </>
    );
};
export { ProductCard };
