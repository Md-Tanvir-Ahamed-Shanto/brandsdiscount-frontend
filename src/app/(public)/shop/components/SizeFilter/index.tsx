import React, { useState, useEffect } from 'react';
import { SizeFilterContent } from './SizeFilterContent';
import { FiChevronDown, FiChevronUp, FiCheckSquare } from 'react-icons/fi';

const SIZE_VALUE_DISPLAY: Record<string, string> = {
    xxs: 'XXS',
    xs: 'XS',
    s: 'S',
    m: 'M',
    l: 'L',
    xl: 'XL',
    xxl: 'XXL+',
    os: 'O/S'
};

const STORAGE_KEY = 'selected_sizes';

const SizeFilterSheet = () => {
    const [open, setOpen] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedSizes = localStorage.getItem(STORAGE_KEY);
        if (storedSizes) {
            setSelectedSizes(JSON.parse(storedSizes));
        } else {
            handleOpen();
        }
    }, []);

    const handleOpen = () => {
        setShowModal(true);
        setTimeout(() => setOpen(true), 10);
    };
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setShowModal(false), 300);
    };

    const selectedValues = selectedSizes.map((v) => SIZE_VALUE_DISPLAY[v] || v);

    const handleSizeChange = (sizes: string[]) => {
        setSelectedSizes(sizes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sizes));
        console.log('Selected sizes:', sizes);
    };

    return (
        <>
            <div className='fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2 flex justify-center w-full pointer-events-none px-2'>
                <button
                    className='pointer-events-auto w-fit px-6 py-2 bg-white text-black rounded-full font-normal shadow-lg hover:bg-gray-100 transition-all duration-200 text-base flex flex-col items-center justify-center'
                    onClick={handleOpen}
                >
                    <span className='flex items-center gap-2 text-base'>
                        Select Size
                        {showModal && open ? (
                            <FiChevronUp className='inline-block text-xl' />
                        ) : (
                            <FiChevronDown className='inline-block text-xl' />
                        )}
                    </span>
                    {selectedValues.length > 0 && (
                        <span className='text-xs mt-1 whitespace-nowrap flex items-center gap-1 text-black font-normal'>
                            <FiCheckSquare className='inline-block' />
                            {selectedValues.join(', ')}
                        </span>
                    )}
                </button>
            </div>
            {showModal && (
                <div
                    className={`fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={handleClose}
                >
                    <div
                        className={`w-full sm:max-w-2xl bg-white rounded-t-2xl shadow-lg p-4 sm:p-6 transition-transform duration-300 relative max-h-[90vh] overflow-y-auto ${open ? 'translate-y-0' : 'translate-y-full'}`}
                        style={{ willChange: 'transform' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className='absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-3xl sm:text-4xl text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 focus:outline-none active:scale-95'
                            onClick={handleClose}
                            aria-label='Close'
                        >
                            &times;
                        </button>
                        <div className='pt-8 sm:pt-4'>
                            <SizeFilterContent
                                selectedSizes={selectedSizes}
                                onChange={handleSizeChange}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SizeFilterSheet;
