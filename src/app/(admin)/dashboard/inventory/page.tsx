import React from 'react';
import Link from 'next/link';
import BarcodeScanner from './components/BarcodeScanner';

const page = () => {
    return (
        <div className='container py-4'>
            <Link
                href='/dashboard/inventory/zero'
                className='bg-red-500 p-2 text-white'
            >
                Visit One Bar Code Tester
            </Link>
            <Link
                href='/dashboard/inventory/one'
                className='bg-red-500 p-2 text-white mx-4'
            >
                Visit Second Bar Code Tester
            </Link>
            <Link
                href='/dashboard/inventory/two'
                className='bg-red-500 p-2 text-white'
            >
                Visit Third Bar Code Tester
            </Link>

            <hr className='mt-6' />

            <h3 className='text-3xl mb-4 py-4'>Scandit Barcode Scanner SDK</h3>
            <BarcodeScanner />
        </div>
    );
};

export default page;
