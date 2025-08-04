import { ISingleProduct } from '@/types';
import clsx from 'clsx';
import { MdClose } from 'react-icons/md';

const ProductStock = ({ product }: { product: ISingleProduct }) => {
    return (
        <p
            className={clsx(
                'text-[#28a745] font-medium text-md mb-3 mt-2',
                product.status === 'instock'
                    ? 'text-[#28a745]'
                    : 'text-[#e01922]'
            )}
        >
            {product.stockQuantity > 0 ? (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 inline-block mr-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                    />
                </svg>
            ) : (
                <MdClose className='h-5 w-5 inline-block mr-1' />
            )}
            {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
    );
};
export { ProductStock };
