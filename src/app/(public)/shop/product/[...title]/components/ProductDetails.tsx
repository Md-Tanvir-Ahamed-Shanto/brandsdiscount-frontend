'use client';
import { ISingleProduct } from '@/types';
import { AuthModal, YouMayAlsoLikeSection } from '.';

interface IProps {
    product: ISingleProduct;
}

const ProductDetails = ({ product }: IProps) => {
    console.log('product', product);
    return (
        <>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='mb-12'>
                    <h1 className='text-xl font-bold mb-2'>
                        {product?.brandName}
                    </h1>
                    <p className='text-lg mb-4'>{product?.title}</p>

                    <div className='flex items-baseline gap-2 mb-4'>
                        <span className='text-2xl font-bold'>
                            ${product?.regularPrice}
                        </span>
                        <button className='text-sm text-blue-600 underline'>
                            Details
                        </button>
                    </div>

                    <div className='mb-6'>
                        <p className='mb-2'>Color: Fairfield</p>
                    </div>

                    <div className='mb-8'>
                        <div className='flex items-center gap-2 mb-4'>
                            <span>Size: Please select</span>
                            <button className='text-sm text-blue-600 underline'>
                                Size Chart
                            </button>
                        </div>

                        <AuthModal product={product} />
                    </div>
                </div>
            </div>
            <YouMayAlsoLikeSection product={product} />
        </>
    );
};

export default ProductDetails;
