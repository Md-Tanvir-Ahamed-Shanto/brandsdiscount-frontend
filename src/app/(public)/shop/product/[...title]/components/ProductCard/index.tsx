"use client"
import { useState, useEffect } from 'react';
import { sizeChartMap } from '@/static';
import { ISingleProduct, ISingleProductVariant } from '@/types';
import { ProductStock } from './ProductStock';
import { OfferCard } from './OfferCard';
import { SizeChart } from './SizeChart';
import { AvailablePaymentMethods } from './AvailablePayments';
import AdditionalInformation from '../AdditionalInformation';
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
    const [selectedVariant, setSelectedVariant] = useState<ISingleProductVariant | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>(product.color || '');
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes || '');

    const sizeChartImage = product.categoryId
        ? sizeChartMap[product.categoryId as keyof typeof sizeChartMap]
        : undefined;

    const handleVariantSelection = (variants: ISingleProductVariant) => {
        setSelectedVariant(variants);
        setSelectedColor(variants.color);
        setSelectedSize(variants.sizes || variants.customSize || '');
    };

    const resetVariantSelection = () => {
        setSelectedVariant(null);
        setSelectedColor(product.color || '');
        setSelectedSize(product.sizes || '');
        setQuantity(1);
    };

    useEffect(() => {
        // Reset quantity when variant changes
        setQuantity(1);
    }, [selectedVariant]);

    useEffect(() => {
        // Only select size on component mount, not color
        const selectFirstAvailableSize = () => {
            // First try to select from main product size
            if (product.sizes && (product.stockQuantity ?? 0) > 0) {
                setSelectedSize(product.sizes);
                return;
            }
            
            // Then try to find first available variant size
            const availableVariants = product.variants?.filter(v => (v.stockQuantity ?? 0) > 0) || [];
            if (availableVariants.length > 0) {
                setSelectedSize(availableVariants[0].sizes || availableVariants[0].customSize || '');
            }
        };
        
        selectFirstAvailableSize();
        // Reset color when component mounts
        setSelectedColor('');
        setSelectedVariant(null);
    }, [product]);

    return (
        <>
            <div className='container mx-auto p-4 md:p-6 max-w-5xl bg-white rounded-xl shadow-xl mt-1'>
                <div className='md:flex md:space-x-8'>
                    <div className='md:w-1/2 max-w-[480px] mx-auto overflow-hidden'>
                        <img src={product?.images[0] || ''} alt={product.title} className="w-full h-auto object-cover" />
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
                            {selectedSize && (
                                <div className='mt-1'>
                                    <p className='text-sm font-medium text-gray-700 mb-1'>Color Options:</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {/* Show main product color only if it matches the selected size and has stock */}
                                        {product.color && product.sizes === selectedSize && (product.stockQuantity ?? 0) > 0 && (
                                            <span 
                                                className={`px-3 py-1 text-sm border rounded-md cursor-pointer ${selectedColor === product.color ? 'border-primary bg-primary/10' : 'hover:border-primary'}`}
                                                onClick={resetVariantSelection}
                                            >
                                                {product.color}
                                            </span>
                                        )}
                                        {/* Show variant colors that match the selected size and have stock */}
                                        {product.variants
                                            ?.filter(v => (v.sizes === selectedSize || v.customSize === selectedSize) && (v.stockQuantity ?? 0) > 0)
                                            .map((variant) => (
                                                <span 
                                                    key={variant.id}
                                                    className={`px-3 py-1 text-sm border rounded-md cursor-pointer ${selectedColor === variant.color ? 'border-primary bg-primary/10' : 'hover:border-primary'}`}
                                                    onClick={() => handleVariantSelection(variant)}
                                                >
                                                    {variant.color}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            )}
                            {(product.sizes || (product.variants && product.variants.some(v => v.sizes || v.customSize))) && (
                                <div className='mt-3'>
                                    <p className='text-sm font-medium text-gray-700 mb-1'>Size Options:</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {product.sizes && (product.stockQuantity ?? 0) > 0 && (
                                            <span 
                                                className={`px-3 py-1 text-sm border rounded-md cursor-pointer ${selectedSize === product.sizes ? 'border-primary bg-primary/10' : 'hover:border-primary'}`}
                                                onClick={resetVariantSelection}
                                            >
                                                {product.sizes}
                                            </span>
                                        )}
                                        {/* Get unique sizes from variants with stock */}
                                        {Array.from(new Set(product.variants
                                            ?.filter(v => (v.stockQuantity ?? 0) > 0)
                                            .map(v => v.sizes || v.customSize)))
                                            .filter(Boolean)
                                            .map((size) => (
                                                <span 
                                                    key={size}
                                                    className={`px-3 py-1 text-sm border rounded-md cursor-pointer ${selectedSize === size ? 'border-primary bg-primary/10' : 'hover:border-primary'}`}
                                                    onClick={() => {
                                                        setSelectedSize(size);
                                                        // Find first variant with this size and stock
                                                        const firstVariant = product.variants?.find(v => 
                                                            (v.sizes === size || v.customSize === size) && 
                                                            (v.stockQuantity ?? 0) > 0
                                                        );
                                                        if (firstVariant) {
                                                            handleVariantSelection(firstVariant);
                                                        }
                                                    }}
                                                >
                                                    {size}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            )}
                            <SizeChart chartImage={sizeChartImage} />
                            <div className='mt-4'>
                                <p className='text-lg font-semibold text-gray-900'>
                                    Price: ${selectedVariant ? selectedVariant.salePrice.toFixed(2) : (product.salePrice || 0).toFixed(2)}
                                    {((selectedVariant ? selectedVariant.regularPrice : product.regularPrice) || 0) > ((selectedVariant ? selectedVariant.salePrice : product.salePrice) || 0) && (
                                        <span className='ml-2 text-sm line-through text-gray-500 opacity-75'>
                                            ${(selectedVariant ? selectedVariant.regularPrice : product.regularPrice || 0).toFixed(2)}
                                        </span>
                                    )}
                                    {(!selectedVariant && product.toggleFirstDeal) && (
                                        <span className='ml-2 text-sm text-green-600'>
                                            (10% off first purchase)
                                        </span>
                                    )}
                                </p>
                            </div>
                            <ProductStock product={selectedVariant ? { ...product, stockQuantity: selectedVariant.stockQuantity } : product} />
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
                                        const maxStock = selectedVariant ? (selectedVariant.stockQuantity ?? 0) : (product.stockQuantity ?? 0);
                                        if (value > maxStock) {
                                            setQuantity(maxStock ?? 1);
                                        } else if (value < 1) {
                                            setQuantity(1);
                                        } else {
                                            setQuantity(value);
                                        }
                                    }}
                                    disabled={product.status === 'outofstock' || (selectedVariant ? selectedVariant.stockQuantity === 0 : product.stockQuantity === 0)}
                                    max={selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity}
                                    className='w-24 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150'
                                />
                            </div>
                        </div>

                        <div>
                            <AuthModal 
                                product={selectedVariant ? {
                                    ...product,
                                    color: selectedVariant.color,
                                    sizes: selectedVariant.sizes || selectedVariant.customSize,
                                    stockQuantity: selectedVariant.stockQuantity,
                                    regularPrice: selectedVariant.regularPrice,
                                    salePrice: selectedVariant.salePrice
                                } : product} 
                                quantity={quantity} 
                            />
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
