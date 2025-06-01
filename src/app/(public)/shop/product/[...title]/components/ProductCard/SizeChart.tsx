import { useState } from 'react';
import { Modal } from '@/components/core';

const SizeChart = ({ chartImage }: { chartImage: string | undefined }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!chartImage) return null;
    return (
        <>
            <button
                className='text-sm my-2 p-2 rounded-sm bg-gray-200 mt-2 flex items-center justify-between w-fit'
                onClick={() => setIsOpen(!isOpen)}
            >
                <p>Size Chart</p>
            </button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                header='Size Chart'
                bodyClass='max-w-2xl'
            >
                <div className='w-full max-h-[80vh] overflow-y-auto'>
                    <img
                        src={chartImage}
                        alt='Size Chart'
                        className='w-full h-auto object-contain'
                    />
                </div>
            </Modal>
        </>
    );
};
export { SizeChart };
